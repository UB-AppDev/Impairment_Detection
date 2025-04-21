// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMEquo_Xw9ZSIeT-PWGM0M6FVGMp1xlOM",
    authDomain: "test-c94be.firebaseapp.com",
    projectId: "test-c94be",
    storageBucket: "test-c94be.firebasestorage.app",
    messagingSenderId: "389345972092",
    appId: "1:389345972092:web:1423ac17ace5c91a2adef9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
