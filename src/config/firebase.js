// ─────────────────────────────────────────────────────────────
//  FIREBASE + CLOUDINARY SETTINGS
// ─────────────────────────────────────────────────────────────
// These values are public by design (they identify the project, they are not passwords).
// What protects the data is firestore.rules — keep ADMIN_EMAILS there in sync with the list below.

export const firebaseConfig = {
  apiKey: 'AIzaSyDxTGucFYyz5hk3BV2q43RJ41CV5pm1tIg',
  authDomain: 'alitech-7bafd.firebaseapp.com',
  projectId: 'alitech-7bafd',
  storageBucket: 'alitech-7bafd.firebasestorage.app',
  messagingSenderId: '588099085860',
  appId: '1:588099085860:web:a7f6caff1311f79f821ab1',
};

// Product photos are stored on Cloudinary (free plan)
export const cloudinary = {
  cloudName: 'pr9klcqo',
  uploadPreset: 'o7ltvvnz', // must be an *Unsigned* upload preset
};

// Google accounts allowed into /admin. Lower-case.
// ⚠ Also add/remove the same emails in firestore.rules and publish the rules.
export const ADMIN_EMAILS = [
  'bellobasit790@gmail.com',
  'abewelaaliua@gmail.com',
];
