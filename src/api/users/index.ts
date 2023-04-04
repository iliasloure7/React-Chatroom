import { db } from '../../config';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { toast } from 'react-toastify';

export const addUserDoc = async (
  userId: string,
  email: string,
  name: string
) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      email,
      name,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    toast.error('Could not add user document. Something went wrong!');
  }
};

export const fetchUserDoc = async (user: User) => {
  const docRef = doc(db, 'users', user.uid);
  return await getDoc(docRef);
};
