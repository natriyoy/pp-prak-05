import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC_LIthU6ZdPLUFkGJz_VO1Hc3Qao2RP8M",
    authDomain: "bur5252-4b177.firebaseapp.com",
    projectId: "bur5252-4b177",
    storageBucket: "bur5252-4b177.firebasestorage.app",
    messagingSenderId: "648872966655",
    appId: "1:648872966655:web:dd57600d328f7640dd4fca"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)