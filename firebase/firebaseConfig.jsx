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
    apiKey: "AIzaSyCJX0Qd2b9T6YXaKHMVISobzlzYhuIX_Tg",
    authDomain: "impairment-app-227bd.firebaseapp.com",
    projectId: "impairment-app-227bd",
    storageBucket: "impairment-app-227bd.firebasestorage.app",
    messagingSenderId: "929314893875",
    appId: "1:929314893875:web:b1ecebedcd7e9a58baf346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
