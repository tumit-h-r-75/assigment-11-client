import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/Firebase.config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    const googleSigneIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const updateUser = (UpdatedData) => {
        return updateProfile(auth.currentUser, UpdatedData);
    }

    // for dark light 
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            setLoading(false);

            if (currentuser?.email) {
                if (!localStorage.getItem('accessToken')) {
                    axios.post('https://volunteer-hub-server-fawn.vercel.app/JWT', { email: currentuser.email })
                        .then(res => {
                            if (res.data.token) {
                                localStorage.setItem('accessToken', res.data.token);
                                console.log('New token saved:', res.data.token);
                            }
                        })
                        .catch(err => console.error('JWT fetch error:', err));
                }
            } else {
                localStorage.removeItem('accessToken');
            }
        });

        return () => unSubscribe();
    }, []);



    const userInfo = {
        user,
        loading,
        createUser,
        signUser,
        signOutUser,
        googleSigneIn,
        updateUser,
        setUser,
        setLoading,
        setTheme,
        theme,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;