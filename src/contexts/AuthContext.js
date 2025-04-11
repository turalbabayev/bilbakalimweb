import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Kullanıcı kayıt fonksiyonu
  async function signup(email, password, name, phone) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Kullanıcı profilini güncelle
      await updateProfile(user, {
        displayName: name
      });
      
      // Firestore'da kullanıcı profili oluştur
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        phone: phone || '',
        role: 'user',
        subscriptionStatus: 'free',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Giriş fonksiyonu
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Çıkış fonksiyonu
  function logout() {
    return signOut(auth);
  }

  // Şifre sıfırlama
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Kullanıcı profili getirme
  async function fetchUserProfile(userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return userDoc.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  // Kullanıcı profili güncelleme
  async function updateUserProfile(userId, data) {
    try {
      const userDocRef = doc(db, "users", userId);
      
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: serverTimestamp()
      });

      // Profili yeniden getir
      return await fetchUserProfile(userId);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // Abonelik oluşturma/güncelleme
  async function updateSubscription(userId, subscriptionData) {
    try {
      const userDocRef = doc(db, "users", userId);
      
      await updateDoc(userDocRef, {
        subscriptionStatus: subscriptionData.status,
        subscriptionType: subscriptionData.type,
        subscriptionStart: subscriptionData.startDate,
        subscriptionEnd: subscriptionData.endDate,
        updatedAt: serverTimestamp()
      });

      // Profili yeniden getir
      return await fetchUserProfile(userId);
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    resetPassword,
    fetchUserProfile,
    updateUserProfile,
    updateSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 