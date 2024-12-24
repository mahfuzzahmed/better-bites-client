import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user login
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update profile
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://server-side-alpha-ecru.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log('login token', res.data)
                        setLoading(false);

                    })
            }
            else {
                axios.post('https://server-side-alpha-ecru.vercel.app/logout', user, { withCredentials: true })
                    .then(res => {
                        // console.log('logout', res.data)
                        setLoading(false);

                    })
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);


    // user logout
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // sign in using google
    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        createNewUser,
        user,
        setUser,
        googleSignIn,
        userLogin,
        userLogOut,
        loading,
        updateUserProfile
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;