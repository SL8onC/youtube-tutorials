import firebase from "firebase";

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp({});

const auth = firebase.auth();
const firestore = firebase.firestore();
const functions = firebase.functions();

if (process.env.REACT_APP_LOCAL_EMULATOR) {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

export { auth, firestore, functions };
export default firebase;
