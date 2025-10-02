import { firestore } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

/**
 * Save or update the user's profile full name.
 * @param fullName - The full name of the user.
 */
export const saveUserProfile = async (fullName: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    await setDoc(
        doc(firestore, "users", user.uid),
        { fullName },
        { merge: true } // Keeps existing fields, only updates fullName
    );
};

/**
 * Retrieve the currently logged-in user's profile.
 * @returns The profile data or null if not found.
 */
export const getUserProfile = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : null;
};
