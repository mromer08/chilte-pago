import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminDashboard = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
    <div>

      {/* Contenido Principal */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido a Chilte Pago  ADMIN {auth.fullname}</h1>
        <p className="mt-2">HOLAAAAAAAAEl mejor servicio para pagos rapidos y seguros.</p>
        <p className='mt-2'>con rol: {auth.role}</p>
        {/* Aquí puedes agregar más contenido o componentes según sea necesario */}
      </div>
    </div>
  );
};

export default AdminDashboard;
