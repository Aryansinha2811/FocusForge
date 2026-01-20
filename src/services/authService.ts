import { auth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const authService = {
    // Email/Password Login
    loginWithEmail: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    },

    // Email/Password Signup
    signupWithEmail: (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    },

    // Google Login/Signup
    loginWithGoogle: () => {
        return signInWithPopup(auth, googleProvider);
    },

    // Logout
    logout: () => {
        return signOut(auth);
    }
};