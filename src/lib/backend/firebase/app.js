import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from '../../../config/firebase';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
