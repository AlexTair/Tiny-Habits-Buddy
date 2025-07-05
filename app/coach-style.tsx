import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { ArrowLeft, Check } from 'lucide-react-native';
import { AICoachStyle } from '@/types/habit';

type CoachStyleOption = {
  value: AICoachStyle;
  title: string;
  description: string;
  example: string;
};

const coachStyles: CoachStyleOption[] = [
  {
    value: 'playful',
    title: 'Playful Friend',
    description: 'Fun, lighthearted encouragement with a touch of humor',
    example: 'You just ninja'd that habit! 🥷',
  },
  {
    value: 'empathetic',
    title: 'Empathetic Guide',
    description: 'Warm, supportive messages that acknowledge your journey',
    example: 'Even showing up counts. Proud of you. 💕',
  },
  {
    value: 'minimalist',
    title: 'Minimalist',
    description: 'Simple, concise encouragement without the fluff',
    example: 'Done. ✓',
  },
  {
    value: 'wise',
    title: 'Wise Mentor',
    description: 'Thoughtful insights with a philosophical touch',
    example: 'Each tiny step reveals the path ahead. Well done.',
  },
  {
    value: 'friendly',
    title: 'Supportive Friend',
    description: 'Casual, relatable encouragement like a close friend',
    example: 'Hey, you did it! That's awesome progress today!',
  },
  {
    value: 'cozy',
    title: 'Cozy Cat',
    description: 'Gentle, comforting messages with a cozy vibe',
    example: 'Purr-fect job on your habit today. *gentle purring*',
  },
];

export default function CoachStyleScreen() {
  const router = useRouter();
  const { aiCoachStyle, setAICoachStyle } = useHabitStore();
  
  const handleBack = () => {
    router.back();
  };
  
  const handleStyleSelect = (style: AICoachStyle) => {
    setAICoachStyle(style);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'AI Coach Style',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.text.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.description}>
          Choose how your AI coach encourages you after completing habits
        </Text>
        
        <View style={styles.optionsContainer}>
          {coachStyles.map(style => (
            <TouchableOpacity
              key={style.value}
              style={[
                styles.optionCard,
                aiCoachStyle === style.value && styles.selectedCard
              ]}
              onPress={() => handleStyleSelect(style.value)}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>{style.title}</Text>
                {aiCoachStyle === style.value && (
                  <View style={styles.checkmark}>
                    <Check size={16} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.optionDescription}>{style.description}</Text>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleLabel}>Example:</Text>
                <Text style={styles.exampleText}>{style.example}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(165, 180, 252, 0.1)',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  exampleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    padding: 12,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.text.primary,
  },
});
