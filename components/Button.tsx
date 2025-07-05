import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors } from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...sizeStyles[size],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (disabled) {
      return {
        ...baseStyle,
        ...variantStyles[variant].disabled,
      };
    }

    return {
      ...baseStyle,
      ...variantStyles[variant].normal,
    };
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      ...styles.text,
      ...textSizeStyles[size],
    };

    if (disabled) {
      return {
        ...baseTextStyle,
        ...variantStyles[variant].disabledText,
      };
    }

    return {
      ...baseTextStyle,
      ...variantStyles[variant].text,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : colors.primary} 
          size="small" 
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

const sizeStyles = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
};

const textSizeStyles = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};

const variantStyles = {
  primary: {
    normal: {
      backgroundColor: colors.primary,
    },
    disabled: {
      backgroundColor: colors.primary + '80', // 50% opacity
    },
    text: {
      color: '#fff',
    },
    disabledText: {
      color: '#fff',
    },
  },
  secondary: {
    normal: {
      backgroundColor: colors.secondary,
    },
    disabled: {
      backgroundColor: colors.secondary + '80',
    },
    text: {
      color: colors.text.primary,
    },
    disabledText: {
      color: colors.text.primary + '80',
    },
  },
  outline: {
    normal: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    disabled: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary + '80',
    },
    text: {
      color: colors.primary,
    },
    disabledText: {
      color: colors.primary + '80',
    },
  },
  ghost: {
    normal: {
      backgroundColor: 'transparent',
    },
    disabled: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.primary,
    },
    disabledText: {
      color: colors.primary + '80',
    },
  },
};
