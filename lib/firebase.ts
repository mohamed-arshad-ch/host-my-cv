import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB9Vj17RfL7My0e0NcLgmFWWCEUdBBkWjo",
  authDomain: "host-my-cv-81a3c.firebaseapp.com",
  projectId: "host-my-cv-81a3c",
  messagingSenderId: "129312736699",
  appId:"1:129312736699:web:aea48198c76d1c9b9a309e",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

