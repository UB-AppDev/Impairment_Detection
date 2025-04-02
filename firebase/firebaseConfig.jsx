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
<<<<<<< HEAD
    apiKey: "AIzaSyBeCVsTB81sSu3XQA60FoWRsFRMGd8_xNA",
    authDomain: "impairmentapp-af527.firebaseapp.com",
    projectId: "impairmentapp-af527",
    storageBucket: "impairmentapp-af527.firebasestorage.app",
    messagingSenderId: "742733577501",
    appId: "1:742733577501:web:0fe8c9a6064f83b431f5f4"
=======
    //apiKey: [YOUR FIREBASE API KEY],
    //authDomain: [YOUR AUTH DOMAIN],
    //projectId: [YOUR PROJECT ID],
    //storageBucket: [YOUR STORAGE BUCKET],
    //messagingSenderId: [YOUR MESSAGING SENDER ID],
    //appId: [YOUR APP ID]
>>>>>>> parent of 82460c7 (Revert "Merge remote-tracking branch 'origin/Dev' into RohinsWork")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

<<<<<<< HEAD
export { auth };
=======
export { auth };
>>>>>>> parent of 82460c7 (Revert "Merge remote-tracking branch 'origin/Dev' into RohinsWork")
