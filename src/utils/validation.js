// Validation utility functions

/**
 * Validate Aadhar number – exactly 12 digits
 */
export const isValidAadhar = (value) => {
  return /^\d{12}$/.test(value.replace(/\s/g, ''));
};

/**
 * Validate Indian mobile number – 10 digits starting with 6-9
 */
export const isValidMobile = (value) => {
  return /^[6-9]\d{9}$/.test(value.replace(/\s/g, ''));
};

/**
 * Validate email address
 */
export const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

/**
 * Check if a string is non-empty after trimming
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Format Aadhar for display: 1234 5678 9012
 */
export const formatAadhar = (value) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 12);
  const parts = cleaned.match(/.{1,4}/g);
  return parts ? parts.join(' ') : cleaned;
};
