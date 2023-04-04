import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { addUserDoc, fetchUserDoc } from '../api/users';
import { auth } from '../config';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../constants';
import { toast } from 'react-toastify';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  registration: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(Paths.HOME);
    } catch (error) {
      toast.error('Bad user credentials!');
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docSnap = await fetchUserDoc(user);

      // Checks user existance.
      if (!docSnap.exists()) {
        addUserDoc(user.uid, user.email!, user.displayName!);
      }

      setUser(user);
      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong with google auth!');
    }
  };

  const registration = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // add new user to database
        addUserDoc(auth.currentUser.uid, email, name);
      }

      navigate(Paths.HOME);
    } catch (error) {
      toast.error('Something went wrong with the registration!');
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate(Paths.HOME);
      } else {
        setUser(null);
        navigate(Paths.SIGNIN);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithGoogle, registration, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('This context cannot be undefined');
  }

  return context;
};

export default AuthProvider;
