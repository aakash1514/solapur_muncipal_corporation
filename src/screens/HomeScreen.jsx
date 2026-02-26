import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Colors from '../constants/colors';

/**
 * HomeScreen – Landing page of the Solapur Municipal Corporation App.
 * Shows two service cards: Birth Certificate & Death Certificate.
 */
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.primaryDark} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏛️</Text>
        <Text style={styles.headerTitleMarathi}>सोलापूर महानगरपालिका</Text>
        <Text style={styles.headerTitleEnglish}>Solapur Municipal Corporation</Text>
        <Text style={styles.headerSubtitle}>ऑनलाइन सेवा पोर्टल • Online Service Portal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>
            🙏 नागरिकांचे स्वागत आहे!{'\n'}
            <Text style={styles.welcomeSubText}>
              कृपया खालील सेवा निवडा{'\n'}Please select a service below
            </Text>
          </Text>
        </View>

        {/* ── Birth Certificate Card ── */}
        <TouchableOpacity
          style={[styles.serviceCard, { backgroundColor: Colors.birthCard }]}
          onPress={() => navigation.navigate('BirthCertificate')}
          activeOpacity={0.85}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: Colors.birthAccent }]}>
            <Text style={styles.cardIcon}>👶</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitleMarathi, { color: Colors.birthAccent }]}>
              जन्म दाखला अर्ज
            </Text>
            <Text style={styles.cardTitleEnglish}>Birth Certificate Application</Text>
            <Text style={styles.cardDescription}>
              बाळाच्या जन्माची नोंदणी करा आणि जन्म प्रमाणपत्र मिळवा
            </Text>
            <Text style={styles.cardDescriptionEn}>
              Register child's birth & get birth certificate
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* ── Death Certificate Card ── */}
        <TouchableOpacity
          style={[styles.serviceCard, { backgroundColor: Colors.deathCard }]}
          onPress={() => navigation.navigate('DeathCertificate')}
          activeOpacity={0.85}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: Colors.deathAccent }]}>
            <Text style={styles.cardIcon}>📜</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitleMarathi, { color: Colors.deathAccent }]}>
              मृत्यू दाखला अर्ज
            </Text>
            <Text style={styles.cardTitleEnglish}>Death Certificate Application</Text>
            <Text style={styles.cardDescription}>
              मृत्यूची नोंदणी करा आणि मृत्यू प्रमाणपत्र मिळवा
            </Text>
            <Text style={styles.cardDescriptionEn}>
              Register death & get death certificate
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © सोलापूर महानगरपालिका • Solapur Municipal Corporation
          </Text>
          <Text style={styles.footerSub}>
            हेल्पलाइन / Helpline: 0217-2625555
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  header: {
    backgroundColor: Colors.primaryDark,
    paddingTop: 18,
    paddingBottom: 22,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 36,
    marginBottom: 6,
  },
  headerTitleMarathi: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
  },
  headerTitleEnglish: {
    fontSize: 14,
    color: '#BBDEFB',
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#90CAF9',
    marginTop: 4,
  },
  body: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  welcomeBox: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  welcomeSubText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitleMarathi: {
    fontSize: 17,
    fontWeight: '700',
  },
  cardTitleEnglish: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  cardDescriptionEn: {
    fontSize: 11,
    color: Colors.textHint,
    lineHeight: 15,
  },
  arrow: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.textHint,
    marginLeft: 4,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 11,
    color: Colors.textHint,
    textAlign: 'center',
  },
  footerSub: {
    fontSize: 11,
    color: Colors.textHint,
    marginTop: 4,
  },
});

export default HomeScreen;
