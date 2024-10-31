import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dashboard from './user/Dashboard';

const Welcome = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  if (auth?.role) {
    return <Dashboard />;
  }

  return (
<p>Bienvenido visitante a Chiltepago!</p>
  );
};

export default Welcome;
