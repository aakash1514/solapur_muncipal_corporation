import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';
import FormInput from '../components/FormInput';
import SectionHeader from '../components/SectionHeader';
import RadioGroup from '../components/RadioGroup';
import DatePickerField from '../components/DatePickerField';
import SubmitButton from '../components/SubmitButton';
import {
  isValidAadhar,
  isValidMobile,
  isValidEmail,
  isNotEmpty,
  formatAadhar,
} from '../utils/validation';

/**
 * DeathCertificateScreen
 * मृत्यू दाखला अर्ज – Death Certificate Application Form
 *
 * All fields from the Solapur Municipal Corporation official form.
 */
const DeathCertificateScreen = ({ navigation }) => {
  // ── Form State ──
  const [form, setForm] = useState({
    applicantName: '',
    applicantAadhar: '',
    applicantMobile: '',
    applicantAddress: '',
    email: '',
    deceasedName: '',
    dateOfDeath: '',
    gender: '',
    placeOfDeath: '',
    deceasedAadhar: '',
    deceasedMotherName: '',
    deceasedFatherSpouseName: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ── Helpers ──
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validate = () => {
    const e = {};

    // Applicant
    if (!isNotEmpty(form.applicantName)) e.applicantName = 'अर्जदाराचे नाव आवश्यक आहे';
    if (!isValidAadhar(form.applicantAadhar)) e.applicantAadhar = 'वैध 12 अंकी आधार क्रमांक आवश्यक';
    if (!isValidMobile(form.applicantMobile)) e.applicantMobile = 'वैध 10 अंकी मोबाईल क्रमांक आवश्यक';
    if (!isNotEmpty(form.applicantAddress)) e.applicantAddress = 'कायमचा पत्ता आवश्यक आहे';
    if (!isValidEmail(form.email)) e.email = 'वैध ईमेल पत्ता आवश्यक आहे';

    // Deceased
    if (!isNotEmpty(form.deceasedName)) e.deceasedName = 'मयताचे नाव आवश्यक आहे';
    if (!isNotEmpty(form.dateOfDeath)) e.dateOfDeath = 'मृत्यू दिनांक आवश्यक आहे';
    if (!form.gender) e.gender = 'लिंग निवडणे आवश्यक आहे';
    if (!isNotEmpty(form.placeOfDeath)) e.placeOfDeath = 'मृत्यू ठिकाण आवश्यक आहे';
    if (!isValidAadhar(form.deceasedAadhar)) e.deceasedAadhar = 'वैध 12 अंकी आधार क्रमांक आवश्यक';
    if (!isNotEmpty(form.deceasedMotherName)) e.deceasedMotherName = 'मयताच्या आईचे नाव आवश्यक आहे';
    if (!isNotEmpty(form.deceasedFatherSpouseName))
      e.deceasedFatherSpouseName = 'मयताच्या वडिलांचे / पतीचे नाव आवश्यक आहे';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      Alert.alert(
        'अपूर्ण फॉर्म / Incomplete Form',
        'कृपया सर्व आवश्यक फील्ड भरा.\nPlease fill all required fields.'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '✅ अर्ज सादर झाला!',
        'तुमचा मृत्यू दाखला अर्ज यशस्वीरित्या सादर झाला आहे.\nYour death certificate application has been submitted successfully.',
        [{ text: 'ठीक आहे / OK', onPress: () => navigation.goBack() }]
      );
    }, 2000);
  };

  // ── Render ──
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.deathAccent} barStyle="light-content" />

      {/* Screen Header */}
      <View style={[styles.header, { backgroundColor: Colors.deathAccent }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerEmoji}>📜</Text>
          <Text style={styles.headerTitle}>मृत्यू दाखला अर्ज</Text>
          <Text style={styles.headerSubtitle}>Death Certificate Application</Text>
        </View>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ━━━━ SECTION: Applicant Details ━━━━ */}
          <SectionHeader
            titleMarathi="अर्जदाराची माहिती"
            titleEnglish="Applicant's Details"
            icon="🧑"
          />

          <FormInput
            labelMarathi="अर्जदाराचे संपूर्ण नाव"
            labelEnglish="Applicant's Full Name"
            placeholder="उदा. सुरेश विठ्ठल जाधव"
            value={form.applicantName}
            onChangeText={(v) => updateField('applicantName', v)}
            error={errors.applicantName}
            required
          />

          <FormInput
            labelMarathi="अर्जदाराचे आधार क्रमांक"
            labelEnglish="Applicant's Aadhar Number"
            placeholder="उदा. 1234 5678 9012"
            value={form.applicantAadhar}
            onChangeText={(v) => updateField('applicantAadhar', formatAadhar(v))}
            keyboardType="numeric"
            maxLength={14}
            error={errors.applicantAadhar}
            hint="12 अंकी आधार क्रमांक प्रविष्ट करा / Enter 12-digit Aadhar number"
            required
          />

          <FormInput
            labelMarathi="अर्जदाराचे मोबाईल क्रमांक"
            labelEnglish="Applicant's Mobile Number"
            placeholder="उदा. 9876543210"
            value={form.applicantMobile}
            onChangeText={(v) => updateField('applicantMobile', v)}
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.applicantMobile}
            hint="10 अंकी मोबाईल क्रमांक / 10-digit mobile number"
            required
          />

          {/* ━━━━ SECTION: Address & Email ━━━━ */}
          <SectionHeader
            titleMarathi="पत्ता आणि ईमेल"
            titleEnglish="Address & Email"
            icon="📫"
          />

          <FormInput
            labelMarathi="अर्जदाराचा कायमचा पत्ता"
            labelEnglish="Applicant's Permanent Address"
            placeholder="उदा. ४५६, शिवाजी नगर, सोलापूर – ४१३००३"
            value={form.applicantAddress}
            onChangeText={(v) => updateField('applicantAddress', v)}
            multiline
            error={errors.applicantAddress}
            required
          />

          <FormInput
            labelMarathi="मृत्यू दाखला ज्यावर पाहिजे तो ईमेल"
            labelEnglish="Email where death certificate should be sent"
            placeholder="उदा. name@example.com"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            error={errors.email}
            hint="मृत्यू प्रमाणपत्र या ईमेलवर पाठवले जाईल / Certificate will be sent to this email"
            required
          />

          {/* ━━━━ SECTION: Deceased's Details ━━━━ */}
          <SectionHeader
            titleMarathi="मयताची माहिती"
            titleEnglish="Deceased's Details"
            icon="🕊️"
          />

          <FormInput
            labelMarathi="मयताचे संपूर्ण नाव"
            labelEnglish="Full Name of Deceased"
            placeholder="उदा. विठ्ठल गणपत जाधव"
            value={form.deceasedName}
            onChangeText={(v) => updateField('deceasedName', v)}
            error={errors.deceasedName}
            required
          />

          <DatePickerField
            labelMarathi="मृत्यू दिनांक"
            labelEnglish="Date of Death"
            value={form.dateOfDeath}
            onPress={() => {
              // TODO: Integrate @react-native-community/datetimepicker
              updateField('dateOfDeath', '10/01/2026');
            }}
            error={errors.dateOfDeath}
            required
          />

          <RadioGroup
            labelMarathi="लिंग"
            labelEnglish="Gender"
            options={[
              { label: 'पुरुष / Male', value: 'male' },
              { label: 'स्त्री / Female', value: 'female' },
            ]}
            selectedValue={form.gender}
            onSelect={(v) => updateField('gender', v)}
            error={errors.gender}
            required
          />

          <FormInput
            labelMarathi="मृत्यू ठिकाण"
            labelEnglish="Place of Death"
            placeholder="उदा. सोलापूर सिविल हॉस्पिटल / Solapur Civil Hospital"
            value={form.placeOfDeath}
            onChangeText={(v) => updateField('placeOfDeath', v)}
            error={errors.placeOfDeath}
            required
          />

          <FormInput
            labelMarathi="मयताचे आधार क्रमांक"
            labelEnglish="Deceased's Aadhar Number"
            placeholder="उदा. 1234 5678 9012"
            value={form.deceasedAadhar}
            onChangeText={(v) => updateField('deceasedAadhar', formatAadhar(v))}
            keyboardType="numeric"
            maxLength={14}
            error={errors.deceasedAadhar}
            hint="12 अंकी आधार क्रमांक प्रविष्ट करा / Enter 12-digit Aadhar number"
            required
          />

          {/* ━━━━ SECTION: Family Details of Deceased ━━━━ */}
          <SectionHeader
            titleMarathi="मयताची कौटुंबिक माहिती"
            titleEnglish="Deceased's Family Details"
            icon="👨‍👩‍👧"
          />

          <FormInput
            labelMarathi="मयताचे आईचे संपूर्ण नाव"
            labelEnglish="Deceased's Mother's Full Name"
            placeholder="उदा. कमलाबाई गणपत जाधव"
            value={form.deceasedMotherName}
            onChangeText={(v) => updateField('deceasedMotherName', v)}
            error={errors.deceasedMotherName}
            required
          />

          <FormInput
            labelMarathi="मयताचे वडिलांचे / पतीचे संपूर्ण नाव"
            labelEnglish="Deceased's Father's / Spouse's Full Name"
            placeholder="उदा. गणपत रामचंद्र जाधव"
            value={form.deceasedFatherSpouseName}
            onChangeText={(v) => updateField('deceasedFatherSpouseName', v)}
            error={errors.deceasedFatherSpouseName}
            hint="वडिलांचे किंवा पतीचे नाव प्रविष्ट करा / Enter father's or spouse's name"
            required
          />

          {/* ━━━━ Notice Banner ━━━━ */}
          <View style={styles.noticeBanner}>
            <Text style={styles.noticeIcon}>📌</Text>
            <Text style={styles.noticeText}>
              सूचना: सर्व <Text style={{ fontWeight: '700' }}>*</Text> चिन्ह असलेली
              फील्ड भरणे अनिवार्य आहे.{'\n'}
              <Text style={styles.noticeTextEn}>
                Note: All fields marked with * are mandatory.
              </Text>
            </Text>
          </View>

          {/* ━━━━ Submit Button ━━━━ */}
          <SubmitButton
            title="अर्ज सादर करा / Submit Application"
            onPress={handleSubmit}
            loading={loading}
            color={Colors.deathAccent}
            style={{ marginTop: 10, marginBottom: 30 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.deathAccent,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 34,
    color: Colors.white,
    fontWeight: '300',
    marginTop: -4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 28,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FFCDD2',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  noticeBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  noticeIcon: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 19,
  },
  noticeTextEn: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default DeathCertificateScreen;
