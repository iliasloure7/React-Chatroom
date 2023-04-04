import { useAuth } from '../../context/AuthContext';
import SelectRoom from './SelectRoom';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-purple-600 text-white'>
      <nav className='p-6 flex items-center justify-between'>
        <h1 className='text-2xl'>Logo</h1>
        {user && (
          <div className='flex items-center justify-center gap-4'>
            <p className='text-lg'>{user.displayName}</p>
            <SelectRoom />
            <button
              className='bg-white text-purple-600 px-3 py-1 rounded-full hover:bg-slate-100'
              onClick={logout}
            >
              logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
