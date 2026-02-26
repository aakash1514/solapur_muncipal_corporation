import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Solapur Municipal Corporation – Certificate Services App
 * सोलापूर महानगरपालिका – प्रमाणपत्र सेवा अॅप
 *
 * Screens:
 *  1. Home         – Service selection (Birth / Death)
 *  2. Birth Cert   – जन्म दाखला अर्ज form
 *  3. Death Cert   – मृत्यू दाखला अर्ज form
 */
export default function App() {
  return <AppNavigator />;
}
