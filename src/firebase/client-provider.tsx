
'use client';

import { FirebaseApp } from 'firebase/app';
import { Auth, signInAnonymously } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';

import {
  FirebaseProvider,
  initializeFirebase,
} from '@/firebase';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const firebaseInstances = await initializeFirebase();
      try {
        await signInAnonymously(firebaseInstances.auth);
      } catch (error) {
        console.error("Anonymous sign-in failed:", error);
      }
      setFirebase(firebaseInstances);
      setLoading(false);
    };

    init();
  }, []);

  if (loading || !firebase) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
