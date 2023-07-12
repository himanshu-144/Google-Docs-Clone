
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkZmi4JX31m9kaSBSSHBvB-Yym2_ik1Ng",
  authDomain: "docs-clone-4fd07.firebaseapp.com",
  projectId: "docs-clone-4fd07",
  storageBucket: "docs-clone-4fd07.appspot.com",
  messagingSenderId: "81484692288",
  appId: "1:81484692288:web:bbcfe3f3af88e21facd8a5"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);