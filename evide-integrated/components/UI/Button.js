import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Modern reusable Button component using Pressable
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {string} props.title - Button text
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {string} props.variant - Button style variant ('primary' | 'secondary' | 'outline')
 * @param {Object} props.style - Additional styles for button container
 * @param {Object} props.textStyle - Additional styles for button text
 */
const Button = ({ 
  onPress, 
  title, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = (pressed) => {
    const baseStyle = [styles.button];
    
    // Add variant-specific styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }

    // Add pressed state style
    if (pressed && !disabled && !loading) {
      baseStyle.push(styles.buttonPressed);
    }

    // Add disabled state style
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }

    // Add custom styles
    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    // Add variant-specific text styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.textPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.textSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.textOutline);
        break;
      default:
        baseStyle.push(styles.textPrimary);
    }

    // Add custom text styles
    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => getButtonStyle(pressed)}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#2675EC' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 100,
  },
  buttonPrimary: {
    backgroundColor: '#2675EC',
  },
  buttonSecondary: {
    backgroundColor: '#FFC75B',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2675EC',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#000000',
  },
  textOutline: {
    color: '#2675EC',
  },
});

export default React.memo(Button);

