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
 * BirthCertificateScreen
 * जन्म दाखला अर्ज – Birth Certificate Application Form
 *
 * All fields from the Solapur Municipal Corporation official form.
 */
const BirthCertificateScreen = ({ navigation }) => {
  // ── Form State ──
  const [form, setForm] = useState({
    fatherName: '',
    fatherAadhar: '',
    fatherMobile: '',
    permanentAddress: '',
    email: '',
    motherName: '',
    motherAadhar: '',
    motherMobile: '',
    childDOB: '',
    gender: '',
    birthPlace: '',
    childNameMarathi: '',
    childNameEnglish: '',
    nameAfter15Years: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ── Helpers ──
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error on edit
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validate = () => {
    const e = {};

    if (!isNotEmpty(form.fatherName)) e.fatherName = 'वडिलांचे नाव आवश्यक आहे';
    if (!isValidAadhar(form.fatherAadhar)) e.fatherAadhar = 'वैध 12 अंकी आधार क्रमांक आवश्यक';
    if (!isValidMobile(form.fatherMobile)) e.fatherMobile = 'वैध 10 अंकी मोबाईल क्रमांक आवश्यक';
    if (!isNotEmpty(form.permanentAddress)) e.permanentAddress = 'कायमचा पत्ता आवश्यक आहे';
    if (!isValidEmail(form.email)) e.email = 'वैध ईमेल पत्ता आवश्यक आहे';

    if (!isNotEmpty(form.motherName)) e.motherName = 'आईचे नाव आवश्यक आहे';
    if (!isValidAadhar(form.motherAadhar)) e.motherAadhar = 'वैध 12 अंकी आधार क्रमांक आवश्यक';
    if (!isValidMobile(form.motherMobile)) e.motherMobile = 'वैध 10 अंकी मोबाईल क्रमांक आवश्यक';

    if (!isNotEmpty(form.childDOB)) e.childDOB = 'जन्म दिनांक आवश्यक आहे';
    if (!form.gender) e.gender = 'लिंग निवडणे आवश्यक आहे';
    if (!form.birthPlace) e.birthPlace = 'जन्म ठिकाण निवडणे आवश्यक आहे';
    if (!isNotEmpty(form.childNameMarathi)) e.childNameMarathi = 'बाळाचे मराठी नाव आवश्यक आहे';
    if (!isNotEmpty(form.childNameEnglish)) e.childNameEnglish = "Child's English name is required";
    if (!form.nameAfter15Years) e.nameAfter15Years = 'कृपया होय किंवा नाही निवडा';

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
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '✅ अर्ज सादर झाला!',
        'तुमचा जन्म दाखला अर्ज यशस्वीरित्या सादर झाला आहे.\nYour birth certificate application has been submitted successfully.',
        [{ text: 'ठीक आहे / OK', onPress: () => navigation.goBack() }]
      );
    }, 2000);
  };

  // ── Render ──
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.birthAccent} barStyle="light-content" />

      {/* Screen Header */}
      <View style={[styles.header, { backgroundColor: Colors.birthAccent }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerEmoji}>👶</Text>
          <Text style={styles.headerTitle}>जन्म दाखला अर्ज</Text>
          <Text style={styles.headerSubtitle}>Birth Certificate Application</Text>
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
          {/* ━━━━ SECTION: Father's Details ━━━━ */}
          <SectionHeader
            titleMarathi="वडिलांची माहिती"
            titleEnglish="Father's Details"
            icon="👨"
          />

          <FormInput
            labelMarathi="वडिलांचे संपूर्ण नाव"
            labelEnglish="Father's Full Name"
            placeholder="उदा. राजेश कुमार पाटील"
            value={form.fatherName}
            onChangeText={(v) => updateField('fatherName', v)}
            error={errors.fatherName}
            required
          />

          <FormInput
            labelMarathi="वडिलांचे आधार क्रमांक"
            labelEnglish="Father's Aadhar Number"
            placeholder="उदा. 1234 5678 9012"
            value={form.fatherAadhar}
            onChangeText={(v) => updateField('fatherAadhar', formatAadhar(v))}
            keyboardType="numeric"
            maxLength={14}
            error={errors.fatherAadhar}
            hint="12 अंकी आधार क्रमांक प्रविष्ट करा / Enter 12-digit Aadhar number"
            required
          />

          <FormInput
            labelMarathi="वडिलांचे मोबाईल क्रमांक"
            labelEnglish="Father's Mobile Number"
            placeholder="उदा. 9876543210"
            value={form.fatherMobile}
            onChangeText={(v) => updateField('fatherMobile', v)}
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.fatherMobile}
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
            labelMarathi="कायमचा पत्ता"
            labelEnglish="Permanent Address"
            placeholder="उदा. १२३, महात्मा गांधी रोड, सोलापूर – ४१३००१"
            value={form.permanentAddress}
            onChangeText={(v) => updateField('permanentAddress', v)}
            multiline
            error={errors.permanentAddress}
            required
          />

          <FormInput
            labelMarathi="जन्म दाखला ज्यावर पाहिजे तो ईमेल"
            labelEnglish="Email to Receive Certificate"
            placeholder="उदा. name@example.com"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            error={errors.email}
            hint="जन्म प्रमाणपत्र या ईमेलवर पाठवले जाईल / Certificate will be sent to this email"
            required
          />

          {/* ━━━━ SECTION: Mother's Details ━━━━ */}
          <SectionHeader
            titleMarathi="आईची माहिती"
            titleEnglish="Mother's Details"
            icon="👩"
          />

          <FormInput
            labelMarathi="आईचे संपूर्ण नाव"
            labelEnglish="Mother's Full Name"
            placeholder="उदा. सुनीता राजेश पाटील"
            value={form.motherName}
            onChangeText={(v) => updateField('motherName', v)}
            error={errors.motherName}
            required
          />

          <FormInput
            labelMarathi="आईचे आधार क्रमांक"
            labelEnglish="Mother's Aadhar Number"
            placeholder="उदा. 1234 5678 9012"
            value={form.motherAadhar}
            onChangeText={(v) => updateField('motherAadhar', formatAadhar(v))}
            keyboardType="numeric"
            maxLength={14}
            error={errors.motherAadhar}
            hint="12 अंकी आधार क्रमांक प्रविष्ट करा / Enter 12-digit Aadhar number"
            required
          />

          <FormInput
            labelMarathi="आईचे मोबाईल क्रमांक"
            labelEnglish="Mother's Mobile Number"
            placeholder="उदा. 9876543210"
            value={form.motherMobile}
            onChangeText={(v) => updateField('motherMobile', v)}
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.motherMobile}
            hint="10 अंकी मोबाईल क्रमांक / 10-digit mobile number"
            required
          />

          {/* ━━━━ SECTION: Child / Birth Details ━━━━ */}
          <SectionHeader
            titleMarathi="बाळाची / जन्माची माहिती"
            titleEnglish="Child / Birth Details"
            icon="🍼"
          />

          <DatePickerField
            labelMarathi="बाळाचा जन्म दिनांक"
            labelEnglish="Child's Date of Birth"
            value={form.childDOB}
            onPress={() => {
              // TODO: Integrate @react-native-community/datetimepicker
              // For demo, set a sample date
              updateField('childDOB', '15/08/2025');
            }}
            error={errors.childDOB}
            required
          />

          <RadioGroup
            labelMarathi="लिंग"
            labelEnglish="Gender"
            options={[
              { label: 'मुलगा / Male', value: 'male' },
              { label: 'मुलगी / Female', value: 'female' },
            ]}
            selectedValue={form.gender}
            onSelect={(v) => updateField('gender', v)}
            error={errors.gender}
            required
          />

          <RadioGroup
            labelMarathi="जन्म ठिकाण"
            labelEnglish="Birth Place"
            options={[
              { label: '🏥 हॉस्पिटल / Hospital', value: 'hospital' },
              { label: '🏠 घर / House', value: 'house' },
              { label: '📍 इतर / Other', value: 'other' },
            ]}
            selectedValue={form.birthPlace}
            onSelect={(v) => updateField('birthPlace', v)}
            error={errors.birthPlace}
            required
          />

          <FormInput
            labelMarathi="बाळाचे संपूर्ण नाव (मराठी)"
            labelEnglish="Child's Full Name (Marathi)"
            placeholder="उदा. आदित्य राजेश पाटील"
            value={form.childNameMarathi}
            onChangeText={(v) => updateField('childNameMarathi', v)}
            error={errors.childNameMarathi}
            hint="कृपया मराठीत लिहा / Please write in Marathi"
            required
          />

          <FormInput
            labelMarathi="बाळाचे संपूर्ण नाव (इंग्लिश)"
            labelEnglish="Child's Full Name (English)"
            placeholder="e.g. Aditya Rajesh Patil"
            value={form.childNameEnglish}
            onChangeText={(v) => updateField('childNameEnglish', v)}
            error={errors.childNameEnglish}
            hint="Please write in English"
            required
          />

          {/* ━━━━ SECTION: Additional Info ━━━━ */}
          <SectionHeader
            titleMarathi="अतिरिक्त माहिती"
            titleEnglish="Additional Information"
            icon="ℹ️"
          />

          <RadioGroup
            labelMarathi="जन्मतारखे पासून १५ वर्षे वया नंतर नाव नोंदवायचे आहेत का ?"
            labelEnglish="Whether name registration is after 15 years of birth?"
            options={[
              { label: 'होय / Yes', value: 'yes' },
              { label: 'नाही / No', value: 'no' },
            ]}
            selectedValue={form.nameAfter15Years}
            onSelect={(v) => updateField('nameAfter15Years', v)}
            error={errors.nameAfter15Years}
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
            color={Colors.birthAccent}
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
    backgroundColor: Colors.birthAccent,
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
    color: '#C8E6C9',
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

export default BirthCertificateScreen;
