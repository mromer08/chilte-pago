import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Welcome = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
<p>Bienvenido visitante a Chiltepago!</p>
  );
};

export default Welcome;
