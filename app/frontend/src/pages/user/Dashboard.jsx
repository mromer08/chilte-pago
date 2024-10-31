import { Link } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import CustomerDashboard from './customer/CustomerDashboard';
import { ROLES } from '../../App';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.

  return (
    <>
      {auth?.role === ROLES.Admin ? <AdminDashboard /> : <CustomerDashboard />}
    </>
  );
};

export default Dashboard;
