export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isEmailValid(email) {
  // simple email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());
}

export function isPhoneValid(phone) {
  // accept 9-12 digits (optional + at start)
  return /^\+?[0-9]{9,12}$/.test(String(phone ?? '').trim());
}

export function isZipValid(zip) {
  // accept 5-10 digits for simplicity
  return /^[0-9]{5,10}$/.test(String(zip ?? '').trim());
}

