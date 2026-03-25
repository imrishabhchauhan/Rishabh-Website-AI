'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, onSnapshot, doc, OperationType, handleFirestoreError } from '@/firebase';

interface SiteSettings {
  accentColor: string;
  accentGlowColor?: string;
  resumeUrl: string;
  servicePrices?: {
    aiWorkflow: string;
    marketing: string;
    content: string;
  };
  status: string;
}

interface FirebaseContextType {
  settings: SiteSettings | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  settings: null,
  loading: true,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'settings/site-config';
    const unsubscribe = onSnapshot(
      doc(db, path),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as SiteSettings;
          setSettings(data);
          
          // Apply colors to CSS variables
          if (data.accentColor) {
            document.documentElement.style.setProperty('--accent', data.accentColor);
          }
          if (data.accentGlowColor) {
            document.documentElement.style.setProperty('--accent-glow', data.accentGlowColor);
          }
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ settings, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};
