import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return result.user;
};

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();

  provider.addScope("email");

  const result = await signInWithPopup(auth, provider);

  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};