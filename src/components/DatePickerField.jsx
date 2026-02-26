import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

/**
 * Date picker trigger field.
 * On press it would open a native date picker (DateTimePicker).
 * Here we show the UI; integration with @react-native-community/datetimepicker
 * can be wired in the parent screen.
 *
 * Props:
 *  - labelMarathi  : string
 *  - labelEnglish  : string
 *  - value         : string (formatted date, e.g. "12/05/2024")
 *  - onPress       : func – open date picker
 *  - placeholder   : string
 *  - required      : bool
 *  - error         : string
 */
const DatePickerField = ({
  labelMarathi,
  labelEnglish,
  value,
  onPress,
  placeholder = 'दिनांक निवडा / Select Date',
  required = false,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelMarathi}>
        {labelMarathi}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <Text style={styles.labelEnglish}>{labelEnglish}</Text>

      <TouchableOpacity style={[styles.input, error && styles.inputError]} onPress={onPress} activeOpacity={0.7}>
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value || placeholder}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
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
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  valueText: {
    fontSize: 15,
    color: Colors.text,
  },
  placeholderText: {
    fontSize: 15,
    color: Colors.textHint,
  },
  calendarIcon: {
    fontSize: 20,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default DatePickerField;
