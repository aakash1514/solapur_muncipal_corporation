import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

/**
 * Reusable radio/selector group for options like Gender, Place type, Yes/No.
 *
 * Props:
 *  - labelMarathi   : string
 *  - labelEnglish   : string
 *  - options        : [{ label: string, value: string }]
 *  - selectedValue  : string
 *  - onSelect       : func(value)
 *  - required       : bool
 *  - error          : string
 */
const RadioGroup = ({
  labelMarathi,
  labelEnglish,
  options,
  selectedValue,
  onSelect,
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

      <View style={styles.optionsRow}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
              <Text
                style={[styles.optionText, isSelected && styles.optionTextSelected]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
    marginBottom: 8,
  },
  requiredStar: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '700',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderWidth: 1.2,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 4,
    marginBottom: 4,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#E3F2FD',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default RadioGroup;
