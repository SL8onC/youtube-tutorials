import "./App.css";
import firebase, { auth } from "./firebase";

const signInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const SignIn = () => (
  <main>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  </main>
);

export default SignIn;
