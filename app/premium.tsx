import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useHabitStore } from '@/store/habitStore';
import { colors } from '@/constants/colors';
import { ArrowLeft, Check, Sparkles } from 'lucide-react-native';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

type FeatureItemProps = {
  title: string;
  description: string;
};

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureCheck}>
        <Check size={16} color="#fff" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function PremiumScreen() {
  const router = useRouter();
  const { isPremium, setPremiumStatus } = useHabitStore();
  
  const handleBack = () => {
    router.back();
  };
  
  const handleSubscribe = () => {
    // In a real app, this would handle payment processing
    setPremiumStatus(true);
    router.back();
  };
  
  const handleOneTime = () => {
    // In a real app, this would handle payment processing
    setPremiumStatus(true);
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Premium',
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
        <LinearGradient
          colors={['#A78BFA', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Sparkles size={32} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>Tiny Habits Premium</Text>
            <Text style={styles.headerSubtitle}>
              Unlock powerful features to build lasting habits
            </Text>
          </View>
        </LinearGradient>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          
          <FeatureItem
            title="AI Habit Builder"
            description="Get personalized tiny habit suggestions based on your mood and goals"
          />
          
          <FeatureItem
            title="Habit Stacking"
            description="Link habits together to build powerful routines"
          />
          
          <FeatureItem
            title="Progress Insights"
            description="Detailed analytics to track your habit-building journey"
          />
          
          <FeatureItem
            title="Custom Themes"
            description="Personalize your experience with beautiful themes"
          />
          
          <FeatureItem
            title="Gentle Wind-Down Mode"
            description="Evening routines to help you relax and reflect"
          />
        </View>
        
        {!isPremium ? (
          <View style={styles.pricingContainer}>
            <Text style={styles.sectionTitle}>Choose Your Plan</Text>
            
            <TouchableOpacity 
              style={styles.pricingOption}
              onPress={handleSubscribe}
            >
              <View style={styles.pricingContent}>
                <Text style={styles.pricingTitle}>Monthly Subscription</Text>
                <Text style={styles.pricingPrice}>$2.99 / month</Text>
                <Text style={styles.pricingDescription}>
                  Cancel anytime
                </Text>
              </View>
              <View style={styles.pricingBadge}>
                <Text style={styles.pricingBadgeText}>Popular</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.pricingOption}
              onPress={handleOneTime}
            >
              <View style={styles.pricingContent}>
                <Text style={styles.pricingTitle}>Lifetime Access</Text>
                <Text style={styles.pricingPrice}>$19.99</Text>
                <Text style={styles.pricingDescription}>
                  One-time payment
                </Text>
              </View>
            </TouchableOpacity>
            
            <Text style={styles.disclaimer}>
              This is a demo app. No actual payment will be processed.
            </Text>
          </View>
        ) : (
          <View style={styles.alreadyPremium}>
            <View style={styles.premiumBadge}>
              <Sparkles size={20} color="#fff" />
              <Text style={styles.premiumBadgeText}>Premium Active</Text>
            </View>
            <Text style={styles.premiumText}>
              You already have access to all premium features. Enjoy!
            </Text>
            <Button
              title="Return to App"
              onPress={handleBack}
              variant="primary"
              style={styles.returnButton}
            />
          </View>
        )}
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
    paddingBottom: 32,
  },
  headerButton: {
    padding: 8,
  },
  header: {
    paddingTop: 32,
    paddingBottom: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 24,
    marginTop: -24,
    backgroundColor: colors.card,
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featureCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  pricingContainer: {
    padding: 24,
    marginHorizontal: 16,
  },
  pricingOption: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  pricingContent: {
    padding: 24,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  pricingDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  pricingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pricingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  disclaimer: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: 8,
  },
  alreadyPremium: {
    padding: 24,
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: 'center',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  premiumBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  premiumText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  returnButton: {
    minWidth: 200,
  },
});
