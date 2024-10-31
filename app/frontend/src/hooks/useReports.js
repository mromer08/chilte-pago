import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

const REPORTS_URL = "/report";

const useReports = () => {
  const axiosPrivate = useAxiosPrivate();
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // Función para obtener el total de comisiones
  const getTotalCommissions = () => {
    axiosPrivate
      .get(`${REPORTS_URL}/commissions`)
      .then((res) => setTotalCommissions(res.data.totalCommissions))
      .catch((error) => {
        console.error(error);
        toast.error(`Error al obtener el total de comisiones: ${error.response?.data?.message || error.message}`);
      });
  };

  // Función para obtener el total de usuarios registrados
  const getTotalUsers = () => {
    axiosPrivate
      .get(`${REPORTS_URL}/total-users`)
      .then((res) => setTotalUsers(res.data.totalUsers))
      .catch((error) => {
        console.error(error);
        toast.error(`Error al obtener el total de usuarios: ${error.response?.data?.message || error.message}`);
      });
  };

  useEffect(() => {
    getTotalCommissions();
    getTotalUsers();
  }, []);

  return {
    totalCommissions,
    totalUsers,
    getTotalCommissions,
    getTotalUsers,
  };
};

export default useReports;
