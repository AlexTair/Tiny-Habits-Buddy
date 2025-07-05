import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, MoodEntry, AICoachStyle } from '@/types/habit';
import { habitTemplates } from '@/constants/habitTemplates';
import { generateId } from '@/utils/helpers';

interface HabitState {
  habits: Habit[];
  moodEntries: MoodEntry[];
  aiCoachStyle: AICoachStyle;
  isPremium: boolean;
  
  // Actions
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
  removeHabit: (id: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  completeHabit: (id: string, date: string, mood?: number, notes?: string) => void;
  uncompleteHabit: (id: string, date: string) => void;
  addMoodEntry: (score: number, note?: string) => void;
  setAICoachStyle: (style: AICoachStyle) => void;
  setPremiumStatus: (status: boolean) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      moodEntries: [],
      aiCoachStyle: 'empathetic',
      isPremium: false,
      
      addHabit: (habitData) => set((state) => {
        const newHabit: Habit = {
          id: generateId(),
          createdAt: new Date().toISOString(),
          completions: [],
          ...habitData,
        };
        return { habits: [...state.habits, newHabit] };
      }),
      
      removeHabit: (id) => set((state) => ({
        habits: state.habits.filter(habit => habit.id !== id)
      })),
      
      updateHabit: (id, updates) => set((state) => ({
        habits: state.habits.map(habit => 
          habit.id === id ? { ...habit, ...updates } : habit
        )
      })),
      
      completeHabit: (id, date, mood, notes) => set((state) => ({
        habits: state.habits.map(habit => {
          if (habit.id !== id) return habit;
          
          const existingCompletionIndex = habit.completions.findIndex(
            c => c.date.split('T')[0] === date.split('T')[0]
          );
          
          const completion = {
            date,
            completed: true,
            ...(mood !== undefined && { mood }),
            ...(notes && { notes }),
          };
          
          let updatedCompletions;
          if (existingCompletionIndex >= 0) {
            updatedCompletions = [...habit.completions];
            updatedCompletions[existingCompletionIndex] = completion;
          } else {
            updatedCompletions = [...habit.completions, completion];
          }
          
          return {
            ...habit,
            completions: updatedCompletions,
          };
        })
      })),
      
      uncompleteHabit: (id, date) => set((state) => ({
        habits: state.habits.map(habit => {
          if (habit.id !== id) return habit;
          
          const existingCompletionIndex = habit.completions.findIndex(
            c => c.date.split('T')[0] === date.split('T')[0]
          );
          
          if (existingCompletionIndex >= 0) {
            const updatedCompletions = [...habit.completions];
            updatedCompletions[existingCompletionIndex] = {
              ...updatedCompletions[existingCompletionIndex],
              completed: false,
            };
            
            return {
              ...habit,
              completions: updatedCompletions,
            };
          }
          
          return habit;
        })
      })),
      
      addMoodEntry: (score, note) => set((state) => {
        const newEntry: MoodEntry = {
          id: generateId(),
          date: new Date().toISOString(),
          score,
          note,
        };
        return { moodEntries: [...state.moodEntries, newEntry] };
      }),
      
      setAICoachStyle: (style) => set({ aiCoachStyle: style }),
      
      setPremiumStatus: (status) => set({ isPremium: status }),
    }),
    {
      name: 'tiny-habits-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
