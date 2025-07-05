import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { ArrowLeft, Calendar, Edit2, Trash2 } from 'lucide-react-native';
import Button from '@/components/Button';
import HabitIcon from '@/components/HabitIcon';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';

export default function HabitDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { habits, completeHabit, uncompleteHabit, removeHabit } = useHabitStore();
  
  const habit = habits.find(h => h.id === id);
  
  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Habit not found</Text>
      </View>
    );
  }
  
  const handleBack = () => {
    router.back();
  };
  
  const handleEdit = () => {
    // Navigate to edit screen (not implemented in this demo)
    Alert.alert('Edit Habit', 'This feature is not implemented in the demo');
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            removeHabit(habit.id);
            router.replace('/');
          }
        },
      ]
    );
  };
  
  // Get the current week days
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  // Toggle completion for a specific date
  const toggleCompletion = (date: Date) => {
    const dateString = date.toISOString();
    const isCompleted = habit.completions.some(
      c => c.date.split('T')[0] === dateString.split('T')[0] && c.completed
    );
    
    if (isCompleted) {
      uncompleteHabit(habit.id, dateString);
    } else {
      completeHabit(habit.id, dateString);
    }
  };
  
  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isCompleted = habit.completions.some(
        c => c.date.split('T')[0] === dateString && c.completed
      );
      
      if (!isCompleted) break;
      
      streak++;
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.text.primary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
                <Edit2 size={20} color={colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.headerButton}>
                <Trash2 size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.habitHeader}>
          <HabitIcon 
            name={habit.icon || 'circle'} 
            color={habit.color || colors.primary} 
            size={40} 
          />
          <Text style={styles.habitTitle}>{habit.name}</Text>
          <Text style={styles.habitDescription}>{habit.description}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {habit.completions.filter(c => c.completed).length}
            </Text>
            <Text style={styles.statLabel}>Total Completions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {habit.frequency === 'daily' 
                ? 'Daily' 
                : habit.frequency === 'weekdays' 
                  ? 'Weekdays' 
                  : habit.frequency === 'weekends' 
                    ? 'Weekends' 
                    : 'Custom'}
            </Text>
            <Text style={styles.statLabel}>Frequency</Text>
          </View>
        </View>
        
        <View style={styles.weekContainer}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weekDays}>
            {weekDays.map((day, index) => {
              const dateString = day.toISOString().split('T')[0];
              const isCompleted = habit.completions.some(
                c => c.date.split('T')[0] === dateString && c.completed
              );
              
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.dayItem}
                  onPress={() => toggleCompletion(day)}
                >
                  <Text style={styles.dayName}>{format(day, 'EEE')}</Text>
                  <View style={[
                    styles.dayCircle,
                    isCompleted && styles.dayCircleCompleted
                  ]}>
                    <Text style={[
                      styles.dayNumber,
                      isCompleted && styles.dayNumberCompleted
                    ]}>
                      {format(day, 'd')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {habit.completions.length > 0 ? (
            habit.completions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((completion, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={[
                    styles.historyStatus,
                    completion.completed ? styles.historyStatusCompleted : styles.historyStatusMissed
                  ]} />
                  <View style={styles.historyTextContainer}>
                    <Text style={styles.historyDate}>
                      {format(parseISO(completion.date), 'EEEE, MMMM d')}
                    </Text>
                    <Text style={styles.historyLabel}>
                      {completion.completed ? 'Completed' : 'Missed'}
                    </Text>
                  </View>
                  {completion.mood && (
                    <Text style={styles.historyMood}>
                      {['😔', '😐', '🙂', '😊', '😁'][completion.mood - 1]}
                    </Text>
                  )}
                </View>
              ))
          ) : (
            <View style={styles.emptyHistory}>
              <Calendar size={32} color={colors.text.tertiary} />
              <Text style={styles.emptyHistoryText}>
                No activity recorded yet
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Mark as Complete for Today"
            onPress={() => {
              const today = new Date().toISOString();
              completeHabit(habit.id, today);
              router.push({
                pathname: '/encouragement',
                params: { habitId: habit.id }
              });
            }}
            variant="primary"
            fullWidth
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerButton: {
    padding: 8,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  habitHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  habitTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  habitDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 8,
  },
  weekContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  dayItem: {
    alignItems: 'center',
  },
  dayName: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  dayNumberCompleted: {
    color: '#fff',
  },
  historyContainer: {
    marginBottom: 24,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  historyStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  historyStatusCompleted: {
    backgroundColor: colors.success,
  },
  historyStatusMissed: {
    backgroundColor: colors.text.tertiary,
  },
  historyTextContainer: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  historyLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  historyMood: {
    fontSize: 20,
  },
  emptyHistory: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
