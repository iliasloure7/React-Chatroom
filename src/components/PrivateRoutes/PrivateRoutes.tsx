import Spinner from '../../common/Spinner';
import { Outlet, Navigate } from 'react-router-dom';
import { Paths } from '../../constants';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return user !== null ? <Outlet /> : <Navigate to={Paths.SIGNIN} />;
}

export default PrivateRoute;
