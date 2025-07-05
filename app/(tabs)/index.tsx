import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { format } from 'date-fns';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import HabitCard from '@/components/HabitCard';
import MoodPicker from '@/components/MoodPicker';
import PremiumBanner from '@/components/PremiumBanner';
import EmptyState from '@/components/EmptyState';
import ProgressCircle from '@/components/ProgressCircle';
import { getCompletedHabitsForDate, getTotalHabitsForDate } from '@/utils/helpers';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { habits, isPremium } = useHabitStore();
  const [refreshing, setRefreshing] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];
  const formattedDate = format(new Date(), 'EEEE, MMMM d');
  
  const totalHabits = getTotalHabitsForDate(habits, today);
  const completedHabits = getCompletedHabitsForDate(habits, today);
  const progress = totalHabits > 0 ? completedHabits / totalHabits : 0;
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  const handleAddHabit = () => {
    router.push('/new-habit');
  };
  
  const todayHabits = habits.filter(habit => {
    if (habit.frequency === 'daily') return true;
    if (habit.frequency === 'weekdays') {
      const dayOfWeek = new Date().getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    }
    if (habit.frequency === 'weekends') {
      const dayOfWeek = new Date().getDay();
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
    if (habit.frequency === 'custom' && habit.customDays) {
      const dayOfWeek = new Date().getDay();
      return habit.customDays.includes(dayOfWeek);
    }
    return false;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.date}>{formattedDate}</Text>
      
      <MoodPicker />
      
      {!isPremium && <PremiumBanner />}
      
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressContainer}>
          <ProgressCircle progress={progress} size={80} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              {completedHabits} of {totalHabits} habits completed
            </Text>
            <Text style={styles.progressSubtext}>
              {progress === 1 
                ? 'Amazing job today!' 
                : progress > 0.5 
                  ? 'You're doing great!' 
                  : 'Small steps lead to big changes'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.habitsSection}>
        <Text style={styles.sectionTitle}>Today's Tiny Habits</Text>
        
        {todayHabits.length > 0 ? (
          todayHabits.map(habit => (
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              date={today} 
            />
          ))
        ) : (
          <EmptyState
            title="No habits for today"
            description="Add your first tiny habit to get started on your journey."
            buttonTitle="Add Habit"
            onButtonPress={handleAddHabit}
            icon={<Plus size={32} color={colors.primary} />}
          />
        )}
      </View>
    </ScrollView>
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
  date: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  progressTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  habitsSection: {
    marginBottom: 16,
  },
});
