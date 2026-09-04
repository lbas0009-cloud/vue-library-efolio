import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBf797rTOGRSwx7go1YV6kyTFZ5y7H5j50",
    authDomain: "fit5032-8102c.firebaseapp.com",
    projectId: "fit5032-8102c",
    storageBucket: "fit5032-8102c.firebasestorage.app",
    messagingSenderId: "212868917712",
    appId: "1:212868917712:web:6d614e65f309f961c5b1d5",
    measurementId: "G-Q2XVF8G3NQ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)