import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
  iconName,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  onFocus,
  onBlur,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };
  
  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    
    if (isFocused) {
      baseStyle.push(styles.containerFocused);
    }
    
    if (error) {
      baseStyle.push(styles.containerError);
    }
    
    if (disabled) {
      baseStyle.push(styles.containerDisabled);
    }
    
    return baseStyle;
  };
  
  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={getContainerStyle()}>
        {(icon || iconName) && (
          <View style={styles.iconContainer}>
            {icon || (
              <Ionicons
                name={iconName}
                size={20}
                color={isFocused ? COLORS.primary : COLORS.gray}
              />
            )}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            (icon || iconName) && styles.inputWithIcon,
            secureTextEntry && styles.inputWithPassword,
            multiline && styles.inputMultiline,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.base,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: BORDER_RADIUS.xl,
    minHeight: 52,
  },
  containerFocused: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  containerError: {
    borderColor: COLORS.error,
  },
  containerDisabled: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
  iconContainer: {
    paddingLeft: SPACING.base,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  inputWithIcon: {
    paddingLeft: SPACING.sm,
  },
  inputWithPassword: {
    paddingRight: SPACING.sm,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: SPACING.md,
  },
  passwordToggle: {
    padding: SPACING.md,
    paddingRight: SPACING.base,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
});
