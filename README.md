# Solapur Municipal Corporation – Certificate Services App
# सोलापूर महानगरपालिका – प्रमाणपत्र सेवा अॅप

A React Native (Expo) mobile app that replicates the **Birth Certificate** (जन्म दाखला) and **Death Certificate** (मृत्यू दाखला) application forms used by **Solapur Municipal Corporation**.

---

## 📱 Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Home** | Landing page with two service cards – Birth & Death certificate |
| 2 | **Birth Certificate** (जन्म दाखला अर्ज) | Complete birth registration form |
| 3 | **Death Certificate** (मृत्यू दाखला अर्ज) | Complete death registration form |

---

## 🗂 Project Structure

```
SolapurMunicipalApp/
├── App.js                          # Entry point
├── app.json                        # Expo config
├── babel.config.js
├── package.json
├── assets/                         # Icons & splash images
└── src/
    ├── components/
    │   ├── DatePickerField.js       # Date selector trigger
    │   ├── FormInput.js             # Reusable text input with bilingual labels
    │   ├── RadioGroup.js            # Radio selector (gender, yes/no, etc.)
    │   ├── SectionHeader.js         # Form section divider
    │   └── SubmitButton.js          # Primary action button
    ├── navigation/
    │   └── AppNavigator.js          # Stack navigator
    ├── screens/
    │   ├── HomeScreen.js            # Landing / service selection
    │   ├── BirthCertificateScreen.js
    │   └── DeathCertificateScreen.js
    └── utils/
        ├── colors.js                # App color palette
        └── validation.js            # Input validation helpers
```

---

## 📝 Birth Certificate Form Fields

| Marathi Label | English Label | Input Type |
|---------------|---------------|------------|
| वडिलांचे संपूर्ण नाव | Father's Full Name | Text |
| वडिलांचे आधार क्रमांक | Father's Aadhar Number | Numeric (12 digits) |
| वडिलांचे मोबाईल क्रमांक | Father's Mobile Number | Phone (10 digits) |
| कायमचा पत्ता | Permanent Address | Multiline Text |
| जन्म दाखला ज्यावर पाहिजे तो ईमेल | Email to Receive Certificate | Email |
| आईचे संपूर्ण नाव | Mother's Full Name | Text |
| आईचे आधार क्रमांक | Mother's Aadhar Number | Numeric (12 digits) |
| आईचे मोबाईल क्रमांक | Mother's Mobile Number | Phone (10 digits) |
| बाळाचा जन्म दिनांक | Child's Date of Birth | Date Picker |
| लिंग | Gender | Radio (Male / Female) |
| जन्म ठिकाण | Birth Place | Radio (Hospital / House / Other) |
| बाळाचे संपूर्ण नाव (मराठी) | Child's Full Name (Marathi) | Text |
| बाळाचे संपूर्ण नाव (इंग्लिश) | Child's Full Name (English) | Text |
| जन्मतारखे पासून १५ वर्षे वया नंतर नाव नोंदवायचे आहेत का ? | Name registration after 15 years? | Radio (Yes / No) |

---

## 📝 Death Certificate Form Fields

| Marathi Label | English Label | Input Type |
|---------------|---------------|------------|
| अर्जदाराचे संपूर्ण नाव | Applicant's Full Name | Text |
| अर्जदाराचे आधार क्रमांक | Applicant's Aadhar Number | Numeric (12 digits) |
| अर्जदाराचे मोबाईल क्रमांक | Applicant's Mobile Number | Phone (10 digits) |
| अर्जदाराचा कायमचा पत्ता | Applicant's Permanent Address | Multiline Text |
| मृत्यू दाखला ज्यावर पाहिजे तो ईमेल | Email for Death Certificate | Email |
| मयताचे संपूर्ण नाव | Full Name of Deceased | Text |
| मृत्यू दिनांक | Date of Death | Date Picker |
| लिंग | Gender | Radio (Male / Female) |
| मृत्यू ठिकाण | Place of Death | Text |
| मयताचे आधार क्रमांक | Deceased's Aadhar Number | Numeric (12 digits) |
| मयताचे आईचे संपूर्ण नाव | Deceased's Mother's Full Name | Text |
| मयताचे वडिलांचे / पतीचे संपूर्ण नाव | Deceased's Father's / Spouse's Full Name | Text |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
cd SolapurMunicipalApp
npm install

# 2. Start the Expo dev server
npx expo start

# 3. Scan the QR code with Expo Go (Android/iOS) or press:
#    a → open Android emulator
#    i → open iOS simulator
#    w → open in web browser
```

---

## 🛠 Tech Stack

- **React Native** (via Expo SDK 52)
- **React Navigation** (Native Stack)
- **JavaScript** (no TypeScript for beginner-friendliness)

---

## ✅ Features

- Bilingual labels (Marathi + English) on every field
- Real-time client-side validation with clear error messages
- Aadhar number auto-formatting (XXXX XXXX XXXX)
- Clean section dividers for logical grouping
- Mandatory field indicators (red asterisk)
- Placeholder text with examples on every input
- Responsive, mobile-optimized layout
- Smooth stack navigation with back buttons
- Submit confirmation dialog

---

© सोलापूर महानगरपालिका • Solapur Municipal Corporation
