import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { getRandomEncouragement } from '@/constants/encouragements';
import { ArrowLeft, Check } from 'lucide-react-native';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { AICoachStyle } from '@/types/habit';

export default function EncouragementScreen() {
  const router = useRouter();
  const { habitId } = useLocalSearchParams<{ habitId: string }>();
  const { habits, aiCoachStyle } = useHabitStore();
  
  const [encouragement, setEncouragement] = useState('');
  
  const habit = habits.find(h => h.id === habitId);
  
  useEffect(() => {
    // Get a random encouragement based on the user's preferred style
    setEncouragement(getRandomEncouragement(aiCoachStyle as any));
  }, [aiCoachStyle]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleContinue = () => {
    router.replace('/');
  };
  
  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Habit not found</Text>
      </View>
    );
  }

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
          headerShown: false,
        }} 
      />
      
      <LinearGradient
        colors={['#A5B4FC', '#8B5CF6']}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.checkContainer}>
            <Check size={48} color="#fff" />
          </View>
          
          <Text style={styles.title}>Habit Completed!</Text>
          
          <View style={styles.habitContainer}>
            <Text style={styles.habitName}>{habit.name}</Text>
          </View>
          
          <View style={styles.encouragementContainer}>
            <Text style={styles.encouragementText}>{encouragement}</Text>
          </View>
          
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  checkContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  habitContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  encouragementContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    width: '100%',
  },
  encouragementText: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.text.primary,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  continueButtonText: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
});
