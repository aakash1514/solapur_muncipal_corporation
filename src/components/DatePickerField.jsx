import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import Colors from '../constants/colors';

// Only import DateTimePicker on native platforms
let DateTimePicker = null;
if (Platform.OS !== 'web') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

/**
 * Self-contained date picker field with native DateTimePicker.
 * Falls back to HTML <input type="date"> on web.
 *
 * Props:
 *  - labelMarathi   : string
 *  - labelEnglish   : string
 *  - value          : Date | null
 *  - onChange        : func(date: Date) – called when user picks a date
 *  - placeholder    : string
 *  - required       : bool
 *  - error          : string
 *  - maximumDate    : Date (optional)
 *  - minimumDate    : Date (optional)
 */

const formatDate = (date) => {
  if (!date) return '';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const toISODateString = (date) => {
  if (!date) return '';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
};

const DatePickerField = ({
  labelMarathi,
  labelEnglish,
  value,
  onChange,
  placeholder = 'दिनांक निवडा / Select Date',
  required = false,
  error,
  maximumDate,
  minimumDate,
}) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());
  const webInputRef = useRef(null);

  const handleChange = (_event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
      if (_event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS – just update temp; confirm on button press
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const handleWebChange = (e) => {
    const val = e.target.value;
    if (val) {
      const [y, m, d] = val.split('-').map(Number);
      onChange(new Date(y, m - 1, d));
    }
  };

  const confirmIOS = () => {
    onChange(tempDate);
    setShow(false);
  };

  const cancelIOS = () => {
    setTempDate(value || new Date());
    setShow(false);
  };

  const openPicker = () => {
    if (Platform.OS === 'web') {
      webInputRef.current?.showPicker?.();
      webInputRef.current?.click?.();
      return;
    }
    setTempDate(value || new Date());
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelMarathi}>
        {labelMarathi}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <Text style={styles.labelEnglish}>{labelEnglish}</Text>

      <TouchableOpacity
        style={[styles.input, error && styles.inputError]}
        onPress={openPicker}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>

        {/* Hidden native date input for web */}
        {Platform.OS === 'web' && (
          <input
            ref={webInputRef}
            type="date"
            value={toISODateString(value)}
            max={maximumDate ? toISODateString(maximumDate) : undefined}
            min={minimumDate ? toISODateString(minimumDate) : undefined}
            onChange={handleWebChange}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}

      {/* Android: inline picker that auto-closes */}
      {show && Platform.OS === 'android' && DateTimePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {/* iOS: modal with confirm/cancel */}
      {Platform.OS === 'ios' && DateTimePicker && (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={cancelIOS}>
                  <Text style={styles.modalCancel}>रद्द करा / Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmIOS}>
                  <Text style={styles.modalDone}>निवडा / Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalCancel: {
    fontSize: 15,
    color: Colors.error,
    fontWeight: '600',
  },
  modalDone: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default DatePickerField;
