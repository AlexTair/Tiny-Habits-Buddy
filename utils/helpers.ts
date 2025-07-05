import { Platform } from 'react-native';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const getCompletedHabitsForDate = (
  habits: any[],
  date: string
): number => {
  return habits.filter(habit => 
    habit.completions.some(
      (completion: any) => 
        completion.date.split('T')[0] === date && completion.completed
    )
  ).length;
};

export const getTotalHabitsForDate = (
  habits: any[],
  date: string
): number => {
  return habits.filter(habit => {
    if (habit.frequency === 'daily') return true;
    if (habit.frequency === 'weekdays') {
      const dayOfWeek = new Date(date).getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    }
    if (habit.frequency === 'weekends') {
      const dayOfWeek = new Date(date).getDay();
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
    if (habit.frequency === 'custom' && habit.customDays) {
      const dayOfWeek = new Date(date).getDay();
      return habit.customDays.includes(dayOfWeek);
    }
    return false;
  }).length;
};

export const getHapticFeedback = async () => {
  if (Platform.OS !== 'web') {
    try {
      const Haptics = require('expo-haptics');
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptics not available');
    }
  }
};
