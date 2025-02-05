import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB9Vj17RfL7My0e0NcLgmFWWCEUdBBkWjo",
  authDomain: "host-my-cv-81a3c.firebaseapp.com",
  projectId: "host-my-cv-81a3c",
  storageBucket:  "host-my-cv-81a3c.firebasestorage.app",
  messagingSenderId: "129312736699",
  appId:"1:129312736699:web:aea48198c76d1c9b9a309e",
}

const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app)
export const db = getFirestore(app)

