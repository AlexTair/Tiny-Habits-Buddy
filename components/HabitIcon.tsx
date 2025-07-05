import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Activity, AlignCenter, Book, Circle, Droplet, 
  Heart, Move, Smile, Wind, 
  type Icon as LucideIconType
} from 'lucide-react-native';

type IconName = 
  | 'activity' 
  | 'align-center' 
  | 'book' 
  | 'circle' 
  | 'droplet' 
  | 'heart' 
  | 'move' 
  | 'smile' 
  | 'wind';

type HabitIconProps = {
  name: IconName | string;
  color: string;
  size?: number;
  backgroundColor?: string;
};

export default function HabitIcon({ 
  name, 
  color, 
  size = 24, 
  backgroundColor 
}: HabitIconProps) {
  const iconProps = {
    size,
    color,
    strokeWidth: 2,
  };

  const getIcon = () => {
    switch (name as IconName) {
      case 'activity':
        return <Activity {...iconProps} />;
      case 'align-center':
        return <AlignCenter {...iconProps} />;
      case 'book':
        return <Book {...iconProps} />;
      case 'droplet':
        return <Droplet {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'move':
        return <Move {...iconProps} />;
      case 'smile':
        return <Smile {...iconProps} />;
      case 'wind':
        return <Wind {...iconProps} />;
      case 'circle':
      default:
        return <Circle {...iconProps} />;
    }
  };

  return (
    <View style={[
      styles.container, 
      backgroundColor && { backgroundColor },
      { width: size * 1.5, height: size * 1.5, borderRadius: size * 0.75 }
    ]}>
      {getIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
