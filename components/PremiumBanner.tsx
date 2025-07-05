import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { colors, shadows } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function PremiumBanner() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/premium');
  };

  return (
    <Pressable onPress={handlePress}>
      <LinearGradient
        colors={['#A78BFA', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, shadows.small]}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Sparkles size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Unlock Premium Features</Text>
            <Text style={styles.description}>
              AI habit builder, habit stacking, insights, and more
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
