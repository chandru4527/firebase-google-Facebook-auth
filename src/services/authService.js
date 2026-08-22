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

  const credential =
    FacebookAuthProvider.credentialFromResult(result);

  const accessToken = credential?.accessToken;

  if (!accessToken) {
    throw new Error("Facebook access token not found");
  }

  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error("Failed to get Facebook profile");
  }

  const profile = await response.json();

  const photoURL = profile.picture?.data?.url || null;

  console.log("Facebook profile:", profile);
  console.log("Facebook image:", photoURL);

  return {
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL,
    provider: "facebook.com",
    facebookId: profile.id,
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};