import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA2qk0-Kd7fgpbkkUiWHpOB5Ky9tAFMdzk",
    authDomain: "astro-authentication-52bfc.firebaseapp.com",
    projectId: "astro-authentication-52bfc",
    storageBucket: "astro-authentication-52bfc.firebasestorage.app",
    messagingSenderId: "600773380706",
    appId: "1:600773380706:web:ebce283ddd747f03bf1f3b"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};