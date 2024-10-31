import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CommissionsReport from './Commission';
import UsersReport from './UsersReport';

const AdminDashboard = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
    <div>

      {/* Contenido Principal */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido a Chilte Pago  ADMIN {auth.fullname}</h1>

        <CommissionsReport/>
        <UsersReport/>
      </div>
    </div>
  );
};

export default AdminDashboard;
