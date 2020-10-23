import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import firebaseConfig from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const firestore = firebase.firestore;
