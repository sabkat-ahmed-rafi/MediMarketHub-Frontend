import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const Authentication = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  // Create an User
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in a User
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log in with Google 
  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  // Update a User
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // LogOut a User
  const logout = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        withCredentials: true,
      })
      return signOut(auth)
  };

  // Save user on database
  const saveUser = async (userEmail, userRole) => {
    const currentUser = {
      email: userEmail,
      role: userRole || "user",
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/user`,
      currentUser
    );
    return data;
  };

  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  
  // Get the currently signIn user
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser)
          if (currentUser) {
              getToken(currentUser.email)
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])
    
    const authInfo = {createUser, loginUser, loginWithGoogle, updateUserProfile, logout, saveUser, getToken, user, loading, setLoading};



  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default Authentication;
