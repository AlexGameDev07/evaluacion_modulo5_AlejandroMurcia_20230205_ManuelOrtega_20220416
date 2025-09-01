// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCcJoRpOFQAYcsPXUai0AaIoZpJslYknDU",
    authDomain: "app-evaluacion-manuel-hector.firebaseapp.com",
    projectId: "app-evaluacion-manuel-hector",
    storageBucket: "app-evaluacion-manuel-hector.firebasestorage.app",
    messagingSenderId: "648305438541",
    appId: "1:648305438541:web:1644576a0ac6ff3ad4d104"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);