import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  isFirebaseConfigured,
} from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check local storage for persistent demo login if not using real Firebase
    const savedDemoUser = localStorage.getItem('regusphere_demo_user');

    if (auth && isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
            provider: 'firebase-google',
          });
        } else if (savedDemoUser) {
          try {
            setCurrentUser(JSON.parse(savedDemoUser));
          } catch (e) {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      if (savedDemoUser) {
        try {
          setCurrentUser(JSON.parse(savedDemoUser));
        } catch (e) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    if (auth && isFirebaseConfigured) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const mappedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
          provider: 'firebase-google',
        };
        setCurrentUser(mappedUser);
        return mappedUser;
      } catch (err) {
        console.error('Firebase Google Sign-In Error:', err);
        setAuthError(err.message);
        throw err;
      }
    } else {
      // Demo Google Sign-In for immediate testing
      const demoUser = {
        uid: 'google-demo-' + Date.now(),
        email: 'regulatory.director@pharma-client.com',
        displayName: 'Dr. Sarah Jenkins (Pharma VP)',
        photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        provider: 'google-demo',
      };
      localStorage.setItem('regusphere_demo_user', JSON.stringify(demoUser));
      setCurrentUser(demoUser);
      return demoUser;
    }
  };

  const logout = async () => {
    try {
      if (auth && isFirebaseConfigured) {
        await fbSignOut(auth);
      }
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    localStorage.removeItem('regusphere_demo_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        authError,
        isFirebaseConfigured,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
