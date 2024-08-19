// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase, la puedes obtener desde tu consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBA6fGj8-aPeyk4m5Klts9lgTGXGQ7tyNA",
  authDomain: "barber-app-payments.firebaseapp.com",
  projectId: "barber-app-payments",
  storageBucket: "barber-app-payments.appspot.com",
  messagingSenderId: "572121178173",
  appId: "1:572121178173:web:bab03a36edb6fbc37d4a54",
};

// Inicializa Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Exporta los servicios de Firebase que necesites
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
