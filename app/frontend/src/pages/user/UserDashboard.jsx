import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserDashboard = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
    <div>

      {/* Contenido Principal */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido a Chilte Pago {auth.fullname}</h1>
        <p className="mt-2">El mejor servicio para pagos rapidos y seguros.</p>
        {/* Aquí puedes agregar más contenido o componentes según sea necesario */}
      </div>
    </div>
  );
};

export default UserDashboard;
