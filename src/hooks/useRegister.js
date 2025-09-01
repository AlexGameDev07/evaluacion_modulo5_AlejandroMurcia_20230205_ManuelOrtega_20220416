import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export function useRegister(auth, db) {
  const register = async ({ name, email, password, age, specialty }) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    await setDoc(doc(db, 'users', uid), {
      name,
      email,
      age: age || null,
      specialty: specialty || null,
      createdAt: new Date().toISOString(),
    });
    return userCred;
  };
  return register;
}