import { useState } from "react";
import { createContext } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useEffect } from "react";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut =()=>{
        setLoading(true);
        return signOut(auth);

    }

    const updateUserProfile = (name)=>{

        return updateProfile(auth.currentUser, {
            displayName: name
        });

    }
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    }, [])
    const AuthInfo = {

        user,
        loading, 
        createUser, 
        signIn, 
        logOut, 
        googleSignIn,
        updateUserProfile

    }


    return (
        <AuthContext.Provider value={AuthInfo}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;