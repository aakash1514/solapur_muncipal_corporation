import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

/**
 * Reusable form input field with bilingual label (Marathi + English).
 *
 * Props:
 *  - labelMarathi   : string  – Marathi label (primary)
 *  - labelEnglish   : string  – English label (secondary)
 *  - placeholder    : string  – Placeholder text
 *  - value          : string  – Current value
 *  - onChangeText   : func    – Change handler
 *  - keyboardType   : string  – Keyboard type (default, numeric, email-address, phone-pad)
 *  - error          : string  – Validation error message (optional)
 *  - hint           : string  – Helper text shown below input (optional)
 *  - multiline      : bool    – Whether input is multiline
 *  - maxLength      : number  – Maximum character length
 *  - required       : bool    – Show required asterisk
 *  - editable       : bool    – Whether the field is editable
 */
const FormInput = ({
  labelMarathi,
  labelEnglish,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
  hint,
  multiline = false,
  maxLength,
  required = false,
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Labels */}
      <View style={styles.labelRow}>
        <Text style={styles.labelMarathi}>
          {labelMarathi}
          {required && <Text style={styles.requiredStar}> *</Text>}
        </Text>
      </View>
      <Text style={styles.labelEnglish}>{labelEnglish}</Text>

      {/* Input */}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          !editable && styles.disabledInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textHint}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        maxLength={maxLength}
        editable={editable}
        autoCorrect={false}
      />

      {/* Hint or Error */}
      {error ? (
        <Text style={styles.errorText}>⚠ {error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelMarathi: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  labelEnglish: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  requiredStar: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderWidth: 1.2,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  disabledInput: {
    backgroundColor: '#EEEEEE',
    color: Colors.textHint,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  hintText: {
    color: Colors.textHint,
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default FormInput;
