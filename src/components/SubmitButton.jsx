import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';

/**
 * Primary action button used for form submission.
 *
 * Props:
 *  - title     : string
 *  - onPress   : func
 *  - loading   : bool
 *  - disabled  : bool
 *  - color     : string (background override)
 *  - style     : object (extra container styles)
 */
const SubmitButton = ({ title, onPress, loading = false, disabled = false, color, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        color && { backgroundColor: color },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default SubmitButton;
