import React from 'react';
import { Tabs } from 'expo-router';
import { Calendar, Home, Plus, Settings, Smile } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  const handleAddHabit = () => {
    router.push('/new-habit');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
          headerTitle: 'Tiny Habits',
        }}
      />
      
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <Calendar size={22} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarIcon: () => (
            <Pressable onPress={handleAddHabit} style={styles.addButton}>
              <Plus size={22} color="#fff" />
            </Pressable>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            handleAddHabit();
          },
        }}
      />
      
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color }) => <Smile size={22} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
  },
  header: {
    backgroundColor: colors.background,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.text.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});
