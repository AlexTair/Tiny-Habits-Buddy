import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { useHabitStore } from '@/store/habitStore';
import { getHapticFeedback } from '@/utils/helpers';

const moods = [
  { score: 1, emoji: '😔', label: 'Low' },
  { score: 2, emoji: '😐', label: 'Meh' },
  { score: 3, emoji: '🙂', label: 'Okay' },
  { score: 4, emoji: '😊', label: 'Good' },
  { score: 5, emoji: '😁', label: 'Great' },
];

export default function MoodPicker() {
  const { addMoodEntry } = useHabitStore();

  const handleMoodSelect = async (score: number) => {
    await getHapticFeedback();
    addMoodEntry(score);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <Pressable
            key={mood.score}
            style={styles.moodButton}
            onPress={() => handleMoodSelect(mood.score)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
