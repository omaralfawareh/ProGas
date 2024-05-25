import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

const provider = new GoogleAuthProvider();

export async function loginWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Alert.alert("Success", `Welcome ${auth.currentUser.email}`);
  } catch (error) {
    Alert.alert("Error", `Unsuccessful Login: ${error.message}`);
  }
}
export async function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      Alert.alert(`Welcome ${user.displayName}`);
    })
    .catch((error) => {
      Alert.alert(`Unsuccessful Login: ${error.message}`);
    });
}
export async function signUpWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Alert.alert("Successful Signup");
  } catch (error) {
    Alert.alert(`Unsuccessful Signup: ${error.message}`);
  }
}
export async function logout() {
  await signOut(auth);
}
