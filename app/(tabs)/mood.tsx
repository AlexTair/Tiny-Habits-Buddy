import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { format, subDays } from 'date-fns';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { Calendar, Edit3 } from 'lucide-react-native';
import EmptyState from '@/components/EmptyState';
import MoodPicker from '@/components/MoodPicker';

const moodEmojis = ['😔', '😐', '🙂', '😊', '😁'];
const moodLabels = ['Low', 'Meh', 'Okay', 'Good', 'Great'];

export default function MoodScreen() {
  const { moodEntries } = useHabitStore();
  
  // Group mood entries by date
  const groupedEntries = moodEntries.reduce((acc, entry) => {
    const date = entry.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, typeof moodEntries>);
  
  // Sort dates in descending order
  const sortedDates = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  // Calculate average mood for the last 7 days
  const calculateWeeklyMood = () => {
    const today = new Date();
    let totalScore = 0;
    let count = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = subDays(today, i).toISOString().split('T')[0];
      const entries = groupedEntries[date] || [];
      
      entries.forEach(entry => {
        totalScore += entry.score;
        count++;
      });
    }
    
    return count > 0 ? totalScore / count : 0;
  };
  
  const weeklyMoodAvg = calculateWeeklyMood();
  const weeklyMoodIndex = Math.round(weeklyMoodAvg) - 1;
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Mood Tracker</Text>
      
      <MoodPicker />
      
      <View style={styles.weeklyContainer}>
        <Text style={styles.sectionTitle}>Weekly Mood</Text>
        <View style={styles.weeklyMoodCard}>
          <View style={styles.weeklyMoodContent}>
            <Text style={styles.weeklyMoodEmoji}>
              {weeklyMoodAvg > 0 ? moodEmojis[weeklyMoodIndex] : '😶'}
            </Text>
            <View style={styles.weeklyMoodTextContainer}>
              <Text style={styles.weeklyMoodTitle}>
                {weeklyMoodAvg > 0 
                  ? `You've been feeling ${moodLabels[weeklyMoodIndex].toLowerCase()}`
                  : 'No mood data yet'}
              </Text>
              <Text style={styles.weeklyMoodSubtitle}>
                {weeklyMoodAvg > 0 
                  ? 'Based on your last 7 days'
                  : 'Start tracking your mood daily'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Mood History</Text>
        
        {sortedDates.length > 0 ? (
          sortedDates.map(date => {
            const entries = groupedEntries[date];
            return (
              <View key={date} style={styles.dateGroup}>
                <Text style={styles.dateLabel}>
                  {format(new Date(date), 'EEEE, MMMM d')}
                </Text>
                
                {entries.map(entry => (
                  <View key={entry.id} style={styles.moodEntry}>
                    <Text style={styles.moodEmoji}>
                      {moodEmojis[entry.score - 1]}
                    </Text>
                    <View style={styles.moodTextContainer}>
                      <Text style={styles.moodLabel}>
                        {moodLabels[entry.score - 1]}
                      </Text>
                      <Text style={styles.moodTime}>
                        {format(new Date(entry.date), 'h:mm a')}
                      </Text>
                    </View>
                    {entry.note && (
                      <Text style={styles.moodNote}>{entry.note}</Text>
                    )}
                  </View>
                ))}
              </View>
            );
          })
        ) : (
          <EmptyState
            title="No mood entries yet"
            description="Start tracking your mood to see your emotional patterns over time."
            icon={<Edit3 size={32} color={colors.text.tertiary} />}
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
  weeklyContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  weeklyMoodCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  weeklyMoodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyMoodEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  weeklyMoodTextContainer: {
    flex: 1,
  },
  weeklyMoodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  weeklyMoodSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  historyContainer: {
    marginBottom: 16,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  moodEntry: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  moodTime: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  moodNote: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
