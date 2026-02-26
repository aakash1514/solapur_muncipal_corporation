import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

/**
 * Section divider with Marathi + English header.
 *
 * Props:
 *  - titleMarathi  : string
 *  - titleEnglish  : string
 *  - icon          : string (emoji, optional)
 */
const SectionHeader = ({ titleMarathi, titleEnglish, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.badge}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.titleMarathi}>{titleMarathi}</Text>
        <Text style={styles.titleEnglish}>{titleEnglish}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1.2,
    backgroundColor: Colors.border,
  },
  badge: {
    backgroundColor: Colors.sectionHeader,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  titleMarathi: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  titleEnglish: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});

export default SectionHeader;
