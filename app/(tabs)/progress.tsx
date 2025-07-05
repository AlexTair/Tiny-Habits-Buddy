import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { format, subDays, addDays, isSameDay } from 'date-fns';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import ProgressCircle from '@/components/ProgressCircle';
import { getCompletedHabitsForDate, getTotalHabitsForDate } from '@/utils/helpers';
import { Calendar } from 'lucide-react-native';
import EmptyState from '@/components/EmptyState';

export default function ProgressScreen() {
  const { habits } = useHabitStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const formattedDate = format(selectedDate, 'EEEE, MMMM d');
  const dateString = selectedDate.toISOString().split('T')[0];
  
  const totalHabits = getTotalHabitsForDate(habits, dateString);
  const completedHabits = getCompletedHabitsForDate(habits, dateString);
  const progress = totalHabits > 0 ? completedHabits / totalHabits : 0;
  
  // Generate last 7 days for the week view
  const generateWeekDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      days.push(date);
    }
    return days;
  };
  
  const weekDays = generateWeekDays();
  
  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Get habits for selected date
  const dateHabits = habits.filter(habit => {
    const habitDate = new Date(dateString);
    const dayOfWeek = habitDate.getDay();
    
    if (habit.frequency === 'daily') return true;
    if (habit.frequency === 'weekdays') {
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    }
    if (habit.frequency === 'weekends') {
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
    if (habit.frequency === 'custom' && habit.customDays) {
      return habit.customDays.includes(dayOfWeek);
    }
    return false;
  });
  
  // Get completion status for each habit
  const habitCompletions = dateHabits.map(habit => {
    const completion = habit.completions.find(
      c => c.date.split('T')[0] === dateString
    );
    
    return {
      id: habit.id,
      name: habit.name,
      completed: completion?.completed || false,
      icon: habit.icon,
      color: habit.color,
    };
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Your Progress</Text>
      
      <View style={styles.weekContainer}>
        {weekDays.map((day, index) => {
          const dayString = day.toISOString().split('T')[0];
          const dayTotal = getTotalHabitsForDate(habits, dayString);
          const dayCompleted = getCompletedHabitsForDate(habits, dayString);
          const dayProgress = dayTotal > 0 ? dayCompleted / dayTotal : 0;
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <View 
              key={index} 
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer
              ]}
              onTouchEnd={() => handleDaySelect(day)}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.selectedDayText
              ]}>
                {format(day, 'EEE')}
              </Text>
              <View style={styles.dayCircle}>
                <ProgressCircle 
                  progress={dayProgress} 
                  size={36} 
                  strokeWidth={4} 
                  showPercentage={false}
                  color={isSelected ? colors.primary : colors.text.tertiary}
                />
                <Text style={[
                  styles.dayNumber,
                  isSelected && styles.selectedDayText
                ]}>
                  {format(day, 'd')}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <ProgressCircle progress={progress} size={100} textSize={20} />
        <View style={styles.summaryTextContainer}>
          <Text style={styles.summaryTitle}>
            {completedHabits} of {totalHabits} habits completed
          </Text>
          <Text style={styles.summaryDescription}>
            {progress === 1 
              ? 'Perfect day! Keep it up!' 
              : progress > 0.5 
                ? 'Good progress today!' 
                : totalHabits > 0 
                  ? 'Every tiny habit counts' 
                  : 'No habits scheduled for this day'}
          </Text>
        </View>
      </View>
      
      <View style={styles.habitsContainer}>
        <Text style={styles.sectionTitle}>Habits for this day</Text>
        
        {habitCompletions.length > 0 ? (
          habitCompletions.map(habit => (
            <View key={habit.id} style={styles.habitItem}>
              <View style={[
                styles.habitIcon, 
                { backgroundColor: habit.color || colors.primary }
              ]}>
                {/* You can add an icon here if needed */}
              </View>
              <Text style={styles.habitName}>{habit.name}</Text>
              <View style={[
                styles.statusIndicator,
                habit.completed ? styles.completedIndicator : styles.pendingIndicator
              ]} />
            </View>
          ))
        ) : (
          <EmptyState
            title="No habits for this day"
            description="You don't have any habits scheduled for this day."
            icon={<Calendar size={32} color={colors.text.tertiary} />}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 24,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  selectedDayContainer: {
    backgroundColor: 'rgba(165, 180, 252, 0.1)',
  },
  dayName: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: '600',
  },
  dayCircle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  summaryDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  habitsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  habitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  habitName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  completedIndicator: {
    backgroundColor: colors.success,
  },
  pendingIndicator: {
    backgroundColor: colors.text.tertiary,
  },
});
