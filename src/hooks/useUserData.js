import { useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';

export function useUserData(auth, db) {
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) {
      setUserData(null);
      return;
    }
    try {
      const uid = user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      setUserData(null);
    }
  }, [auth, db]);

  return [userData, fetchUserData, setUserData];
}