'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "@/firebase.init";




export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();
  
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  };


  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
