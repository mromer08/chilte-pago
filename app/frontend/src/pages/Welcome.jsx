import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Welcome = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
    <div>
      {/* NavBar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex space-x-4">
          <Link to="/about" className="hover:underline">Acerca de</Link>
          <Link to="/faq" className="hover:underline">Preguntas Frecuentes</Link>
        </div>
        <div>
          {auth.fullname ? (
            <span className="text-lg">{`Dashboard`}</span>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido a Chilte Pago</h1>
        <p className="mt-2">El mejor servicio para pagos rapidos y seguros.</p>
        {/* Aquí puedes agregar más contenido o componentes según sea necesario */}
      </div>
    </div>
  );
};

export default Welcome;
