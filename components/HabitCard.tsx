import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, ChevronRight } from 'lucide-react-native';
import { colors, shadows } from '@/constants/colors';
import { Habit } from '@/types/habit';
import { useHabitStore } from '@/store/habitStore';
import { getHapticFeedback } from '@/utils/helpers';
import HabitIcon from './HabitIcon';

type HabitCardProps = {
  habit: Habit;
  date: string;
};

export default function HabitCard({ habit, date }: HabitCardProps) {
  const router = useRouter();
  const { completeHabit, uncompleteHabit } = useHabitStore();
  
  const isCompleted = habit.completions.some(
    completion => 
      completion.date.split('T')[0] === date.split('T')[0] && 
      completion.completed
  );
  
  const handleToggleCompletion = async () => {
    await getHapticFeedback();
    if (isCompleted) {
      uncompleteHabit(habit.id, date);
    } else {
      completeHabit(habit.id, date);
      
      // Navigate to encouragement screen after completing
      router.push({
        pathname: '/encouragement',
        params: { habitId: habit.id }
      });
    }
  };
  
  const handlePress = () => {
    router.push({
      pathname: '/habit/[id]',
      params: { id: habit.id }
    });
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.card, shadows.small]} 
        onPress={handlePress}
      >
        <View style={styles.content}>
          <HabitIcon 
            name={habit.icon || 'circle'} 
            color={habit.color || colors.primary} 
            size={24} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{habit.name}</Text>
            <Text style={styles.description} numberOfLines={1}>
              {habit.description}
            </Text>
          </View>
          <ChevronRight size={18} color={colors.text.tertiary} />
        </View>
      </Pressable>
      
      <Pressable
        style={[
          styles.checkButton,
          isCompleted && styles.completedButton
        ]}
        onPress={handleToggleCompletion}
      >
        {isCompleted && <Check size={16} color="#fff" />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
