import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAY-R6VrJ0X6Vs7wXAeNXeAp2viN1mu_jM",
    authDomain: "rotadaamizade-8a639.firebaseapp.com",
    projectId: "rotadaamizade-8a639",
    storageBucket: "rotadaamizade-8a639.appspot.com",
    messagingSenderId: "279632215503",
    appId: "1:279632215503:web:13f99a13a9edcc16d426ba",
    measurementId: "G-E7S32NPN0L"
};

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)