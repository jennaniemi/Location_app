import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyA10tcJNENV8inlwWct20W3_mgrDd_y1FA",
  authDomain: "location-app-6b678.firebaseapp.com",
  projectId: "location-app-6b678",
  storageBucket: "location-app-6b678.appspot.com",  // ✅ Correct storage bucket
  messagingSenderId: "309549242426",
  appId: "1:309549242426:web:f35ecf96681dba75bf3d03",
  measurementId: "G-NKGJQN447G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // ✅ Correct Firestore instance

export { db };  // ✅ Make sure db is exported correctly
