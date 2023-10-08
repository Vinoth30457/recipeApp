// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import "firebase/storage";
// import myContext from "../context/data/myContext";

const firebaseConfig = {
  apiKey: "AIzaSyDqIryvf9PgTIib3Wr9yMbbdqQTKTBo7_Q",
  authDomain: "recipe-app-304ae.firebaseapp.com",
  projectId: "recipe-app-304ae",
  storageBucket: "recipe-app-304ae.appspot.com",
  messagingSenderId: "237309585728",
  appId: "1:237309585728:web:785b575b9a1ec478a4b2a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);

export { fireDB, auth };
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
export async function upload(file, currentUser) {
  // const context = useContext(myContext);
  // const { photoURL } = context;
  const fileRef = ref(storage, currentUser.uid + ".png");

  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });
}
