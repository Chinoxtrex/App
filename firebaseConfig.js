import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvGNn-RK4NLPVLtTMS-G1PpQLRjHhfdlM",
  authDomain: "app1-b3e32.firebaseapp.com",
  projectId: "app1-b3e32",
  storageBucket: "app1-b3e32.appspot.com",
  messagingSenderId: "155472462795",
  appId: "1:155472462795:web:2f422528f2081ed4d9ac4e",
  measurementId: "G-XMMB8E3H41"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore, firebaseConfig };
