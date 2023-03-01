import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
/* FIREBASE AUTH */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();

/*CUSTOM HOOK */
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    // MONITOR CURRENTLY SIGNED IN USER
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
        });

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
