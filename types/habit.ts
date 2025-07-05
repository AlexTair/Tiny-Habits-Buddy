export type HabitCategory = 
  | 'mindfulness' 
  | 'fitness' 
  | 'productivity' 
  | 'health' 
  | 'creativity' 
  | 'social' 
  | 'custom';

export type HabitFrequency = 
  | 'daily' 
  | 'weekdays' 
  | 'weekends' 
  | 'weekly' 
  | 'custom';

export type HabitCompletion = {
  date: string; // ISO date string
  completed: boolean;
  mood?: number; // 1-5 scale
  notes?: string;
};

export type Habit = {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  customDays?: number[]; // 0-6 for Sunday-Saturday
  timeOfDay?: string; // HH:MM format
  isTemplate?: boolean;
  createdAt: string; // ISO date string
  completions: HabitCompletion[];
  reminderEnabled?: boolean;
  reminderTime?: string; // HH:MM format
  icon?: string;
  color?: string;
  linkedTo?: string; // ID of habit this is stacked with
};

export type MoodEntry = {
  id: string;
  date: string; // ISO date string
  score: number; // 1-5
  note?: string;
};

export type AICoachStyle = 
  | 'playful' 
  | 'empathetic' 
  | 'minimalist' 
  | 'wise' 
  | 'friendly' 
  | 'cozy';
