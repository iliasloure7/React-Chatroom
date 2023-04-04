import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../context/AuthContext';

function GoogleOauth() {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      type='button'
      className='flex items-center justify-center gap-2 border-2 border-neutral-300 btn hover:bg-slate-200'
      onClick={loginWithGoogle}
    >
      <FcGoogle size={30} />
      Continue with Google
    </button>
  );
}

export default GoogleOauth;
