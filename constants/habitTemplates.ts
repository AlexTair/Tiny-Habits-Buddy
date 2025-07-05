import { Habit, HabitCategory } from '@/types/habit';
import { generateId } from '@/utils/helpers';

export const habitTemplates: Habit[] = [
  {
    id: 'template-meditation',
    name: '1-Minute Meditation',
    description: 'Take a minute to breathe and center yourself',
    category: 'mindfulness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'wind',
    color: '#A5B4FC',
  },
  {
    id: 'template-journal',
    name: '5-Word Journal',
    description: 'Today I felt ____ because ____',
    category: 'mindfulness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'book',
    color: '#A7F3D0',
  },
  {
    id: 'template-gratitude',
    name: '10-Second Gratitude',
    description: 'Think of one thing you're grateful for today',
    category: 'mindfulness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'heart',
    color: '#FCD34D',
  },
  {
    id: 'template-pushup',
    name: '1 Push-up',
    description: 'Just one push-up. That's it!',
    category: 'fitness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'activity',
    color: '#F87171',
  },
  {
    id: 'template-water',
    name: 'Drink 1 Glass of Water',
    description: 'Stay hydrated with just one glass',
    category: 'health',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'droplet',
    color: '#60A5FA',
  },
  {
    id: 'template-stretch',
    name: '30-Second Stretch',
    description: 'A quick stretch for your body',
    category: 'fitness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'move',
    color: '#C4B5FD',
  },
  {
    id: 'template-posture',
    name: 'Posture Check',
    description: 'Take a moment to fix your posture',
    category: 'health',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'align-center',
    color: '#FBBF24',
  },
  {
    id: 'template-compliment',
    name: 'Self-Compliment',
    description: 'Say one nice thing to yourself',
    category: 'mindfulness',
    frequency: 'daily',
    isTemplate: true,
    createdAt: new Date().toISOString(),
    completions: [],
    icon: 'smile',
    color: '#F472B6',
  },
];

export const createHabitFromTemplate = (templateId: string): Habit => {
  const template = habitTemplates.find(t => t.id === templateId);
  if (!template) {
    throw new Error(`Template with ID ${templateId} not found`);
  }
  
  return {
    ...template,
    id: generateId(),
    isTemplate: false,
    createdAt: new Date().toISOString(),
    completions: [],
  };
};
