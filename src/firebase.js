// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add your Firebase configuration
// استخدم المفتاح الموجود في المشروع
const firebaseConfig = {
    apiKey: "AIzaSyBXGMsIBdH14fvcqg3ae7Hzau",
    authDomain: "mntapp-8cfc4.firebaseapp.com",
    projectId: "mntapp-8cfc4",
    storageBucket: "mntapp-8cfc4.firebasestorage.app",
    messagingSenderId: "1027050884126",
    appId: "1:1027050884126:web:1da6f7a3b7bda12aa8720f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const token = await getToken(messaging, {
                vapidKey: 'BNuqjY63tjkziQ2gq8CFG3avPDy5qY8EedTh8g30vnFpu39LsMvE7P5_UDj94kj5h0AkQW2OYHgHn0NMIKRWhoE'
            });
            console.log('FCM Token:', token);
            return token;
        } else {
            console.log('Unable to get permission to notify.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while retrieving token:', error);
        return null;
    }
};

// Listen for foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('Message received:', payload);
            resolve(payload);
        });
    });

export default app;
