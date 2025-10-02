import { auth } from "../firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateEmail as firebaseUpdateEmail, 
    updatePassword as firebaseUpdatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    User
} from "firebase/auth";

export const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};

export const updateEmail = async (newEmail: string, currentPassword: string) => {
    const user = auth.currentUser;
    if (!user) return Promise.reject("No user is logged in");

    try {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        return firebaseUpdateEmail(user, newEmail);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updatePassword = async (newPassword: string, currentPassword: string) => {
    const user = auth.currentUser;
    if (!user) return Promise.reject("No user is logged in");

    try {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        return firebaseUpdatePassword(user, newPassword);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};
