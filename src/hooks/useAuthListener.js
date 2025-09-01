import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuthListener(auth, callback) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, callback);
    return () => unsubscribe();
  }, [auth, callback]);
}