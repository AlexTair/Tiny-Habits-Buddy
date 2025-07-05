import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

type ProgressCircleProps = {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  textSize?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
};

export default function ProgressCircle({
  progress,
  size = 80,
  strokeWidth = 8,
  textSize = 18,
  showPercentage = true,
  color = colors.primary,
  backgroundColor = 'rgba(165, 180, 252, 0.2)',
}: ProgressCircleProps) {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - normalizedProgress);
  
  // Calculate center position
  const center = size / 2;
  
  // Format percentage text
  const percentageText = `${Math.round(normalizedProgress * 100)}%`;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.background}>
        {/* Background Circle */}
        <svg width={size} height={size}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={backgroundColor}
            fill="transparent"
          />
        </svg>
      </View>
      
      <View style={styles.progress}>
        {/* Progress Circle */}
        <svg width={size} height={size}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${center}, ${center})`}
          />
        </svg>
      </View>
      
      {showPercentage && (
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontSize: textSize, color: colors.text.primary }]}>
            {percentageText}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
