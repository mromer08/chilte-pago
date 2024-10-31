import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CardButton from '../../../components/CardButton';
import { priceFormatter } from '../../../utils/priceFormatter';

const CustomerDashboard = () => {
  const { auth } = useAuth(); // Obtener información del usuario y su estado de autenticación.
  // console.log(auth);

  return (
    <div>

      {/* Contenido Principal */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard de {auth.fullname}</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <CardButton link='/user/balance' title='BALANCE' value={priceFormatter.format(auth.balance)}/>
        </div>
        
      </div>
    </div>
  );
};

export default CustomerDashboard;
