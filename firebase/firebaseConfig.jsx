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
    //apiKey: [YOUR FIREBASE API KEY],
    //authDomain: [YOUR AUTH DOMAIN],
    //projectId: [YOUR PROJECT ID],
    //storageBucket: [YOUR STORAGE BUCKET],
    //messagingSenderId: [YOUR MESSAGING SENDER ID],
    //appId: [YOUR APP ID]
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };