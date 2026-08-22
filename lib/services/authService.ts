// lib/services/authService.ts
// Firebase Authentication service

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/**
 * Sign in with email and password
 */
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Change password for current user
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("No user logged in");
  }

  try {
    // Reauthenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Password change error:", error);
    throw error;
  }
};

/**
 * Get user profile data from Firestore
 */
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Update user profile in Firestore
 */
export const updateUserProfile = async (userId: string, data: Record<string, any>) => {
  try {
    await setDoc(doc(db, "users", userId), data, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
