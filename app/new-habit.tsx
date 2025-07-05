import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { habitTemplates } from '@/constants/habitTemplates';
import Button from '@/components/Button';
import HabitIcon from '@/components/HabitIcon';
import { ArrowLeft, Check } from 'lucide-react-native';
import { HabitCategory, HabitFrequency } from '@/types/habit';

const categories: { value: HabitCategory; label: string; color: string }[] = [
  { value: 'mindfulness', label: 'Mindfulness', color: '#A5B4FC' },
  { value: 'fitness', label: 'Fitness', color: '#F87171' },
  { value: 'productivity', label: 'Productivity', color: '#60A5FA' },
  { value: 'health', label: 'Health', color: '#34D399' },
  { value: 'creativity', label: 'Creativity', color: '#FBBF24' },
  { value: 'social', label: 'Social', color: '#F472B6' },
  { value: 'custom', label: 'Custom', color: '#9CA3AF' },
];

const frequencies: { value: HabitFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'custom', label: 'Custom' },
];

export default function NewHabitScreen() {
  const router = useRouter();
  const { addHabit } = useHabitStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>('mindfulness');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const handleTemplateSelect = (templateId: string) => {
    const template = habitTemplates.find(t => t.id === templateId);
    if (template) {
      setName(template.name);
      setDescription(template.description);
      setCategory(template.category);
      setSelectedTemplate(templateId);
    }
    handleNext();
  };
  
  const handleCreateHabit = () => {
    addHabit({
      name,
      description,
      category,
      frequency,
      icon: habitTemplates.find(t => t.id === selectedTemplate)?.icon || 'circle',
      color: categories.find(c => c.value === category)?.color || colors.primary,
    });
    
    router.replace('/');
  };
  
  const renderStepOne = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose a Template</Text>
      <Text style={styles.stepDescription}>
        Start with a pre-made tiny habit or create your own
      </Text>
      
      <ScrollView style={styles.templateList}>
        {habitTemplates.map(template => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateItem}
            onPress={() => handleTemplateSelect(template.id)}
          >
            <HabitIcon 
              name={template.icon || 'circle'} 
              color={template.color || colors.primary} 
              size={24} 
            />
            <View style={styles.templateTextContainer}>
              <Text style={styles.templateTitle}>{template.name}</Text>
              <Text style={styles.templateDescription} numberOfLines={1}>
                {template.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <Button
        title="Create Custom Habit"
        onPress={handleNext}
        variant="outline"
        fullWidth
      />
    </View>
  );
  
  const renderStepTwo = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Habit Details</Text>
      <Text style={styles.stepDescription}>
        Keep it tiny and achievable
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g., 1-Minute Meditation"
          placeholderTextColor={colors.text.tertiary}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="What does this tiny habit involve?"
          placeholderTextColor={colors.text.tertiary}
          multiline
          numberOfLines={3}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.categoryItem,
                category === cat.value && styles.categoryItemSelected,
                { borderColor: cat.color }
              ]}
              onPress={() => setCategory(cat.value)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  category === cat.value && { color: cat.color }
                ]}
              >
                {cat.label}
              </Text>
              {category === cat.value && (
                <View style={[styles.categoryCheck, { backgroundColor: cat.color }]}>
                  <Check size={12} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="ghost"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          style={{ flex: 1 }}
          disabled={!name.trim()}
        />
      </View>
    </View>
  );
  
  const renderStepThree = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Habit Frequency</Text>
      <Text style={styles.stepDescription}>
        How often do you want to do this tiny habit?
      </Text>
      
      <View style={styles.frequencyContainer}>
        {frequencies.map(freq => (
          <TouchableOpacity
            key={freq.value}
            style={[
              styles.frequencyItem,
              frequency === freq.value && styles.frequencyItemSelected
            ]}
            onPress={() => setFrequency(freq.value)}
          >
            <Text 
              style={[
                styles.frequencyText,
                frequency === freq.value && styles.frequencyTextSelected
              ]}
            >
              {freq.label}
            </Text>
            {frequency === freq.value && (
              <View style={styles.frequencyCheck}>
                <Check size={12} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Habit Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Name:</Text>
          <Text style={styles.summaryValue}>{name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Category:</Text>
          <Text style={styles.summaryValue}>
            {categories.find(c => c.value === category)?.label}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Frequency:</Text>
          <Text style={styles.summaryValue}>
            {frequencies.find(f => f.value === frequency)?.label}
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="ghost"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          title="Create Habit"
          onPress={handleCreateHabit}
          variant="primary"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Stack.Screen 
        options={{
          title: 'New Tiny Habit',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.text.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.progressContainer}>
          {[1, 2, 3].map(i => (
            <View 
              key={i}
              style={[
                styles.progressDot,
                step >= i && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  templateList: {
    marginBottom: 24,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  templateTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    paddingVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItemSelected: {
    backgroundColor: 'rgba(165, 180, 252, 0.1)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  categoryCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  frequencyItemSelected: {
    backgroundColor: 'rgba(165, 180, 252, 0.1)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  frequencyText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  frequencyTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  frequencyCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  summaryLabel: {
    width: 100,
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
