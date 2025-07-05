import React from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { 
  Bell, ChevronRight, CreditCard, HelpCircle, 
  MessageSquare, Moon, Sparkles, User 
} from 'lucide-react-native';

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

function SettingItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  rightElement 
}: SettingItemProps) {
  return (
    <Pressable 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightElement || (
        onPress && <ChevronRight size={20} color={colors.text.tertiary} />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { aiCoachStyle, setAICoachStyle, isPremium, setPremiumStatus } = useHabitStore();
  
  const handlePremiumPress = () => {
    router.push('/premium');
  };
  
  const handleCoachStylePress = () => {
    router.push('/coach-style');
  };
  
  // This is just for demo purposes
  const togglePremium = () => {
    setPremiumStatus(!isPremium);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon={<User size={20} color={colors.primary} />}
            title="Profile"
            subtitle="Manage your account"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Sparkles size={20} color="#8B5CF6" />}
            title="Premium Features"
            subtitle={isPremium ? "You're a premium user" : "Unlock all features"}
            onPress={handlePremiumPress}
            rightElement={
              <Switch
                value={isPremium}
                onValueChange={togglePremium}
                trackColor={{ false: '#D1D5DB', true: '#A5B4FC' }}
                thumbColor={isPremium ? colors.primary : '#F9FAFB'}
              />
            }
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon={<MessageSquare size={20} color={colors.primary} />}
            title="AI Coach Style"
            subtitle={`Current: ${aiCoachStyle}`}
            onPress={handleCoachStylePress}
          />
          <SettingItem
            icon={<Bell size={20} color={colors.primary} />}
            title="Notifications"
            subtitle="Manage reminders"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Moon size={20} color={colors.primary} />}
            title="Appearance"
            subtitle="Light mode"
            onPress={() => {}}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon={<HelpCircle size={20} color={colors.primary} />}
            title="Help & FAQ"
            onPress={() => {}}
          />
          <SettingItem
            icon={<MessageSquare size={20} color={colors.primary} />}
            title="Send Feedback"
            onPress={() => {}}
          />
        </View>
      </View>
      
      <Text style={styles.version}>Tiny Habits v1.0.0</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  version: {
    fontSize: 14,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: 16,
  },
});
