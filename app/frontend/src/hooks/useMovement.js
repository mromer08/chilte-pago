import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

const MOVEMENTS_URL = "/fund-movement";

const useMovements = () => {
  const axiosPrivate = useAxiosPrivate();
  const [movements, setMovements] = useState([]);

  const getAllMovements = async () => {
    try {
      const res = await axiosPrivate.get(MOVEMENTS_URL);
      setMovements(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener todos los movimientos de fondos.");
    }
  };

  // Obtener movimientos de fondos para el usuario autenticado
  const getMovementsByUserAuth = async () => {
    try {
      const res = await axiosPrivate.get(`${MOVEMENTS_URL}/user`);
      setMovements(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener movimientos de fondos.");
    }
  };

  // Obtener movimientos de fondos para un usuario específico (solo para el rol ADMIN)
  const getMovementsByUserId = async (userId) => {
    try {
      const res = await axiosPrivate.get(`${MOVEMENTS_URL}/user/${userId}`);
      setMovements(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener movimientos de fondos del usuario.");
    }
  };

  // useEffect para obtener movimientos del usuario autenticado al montar el componente
  useEffect(() => {
    getMovementsByUserAuth();
  }, []);

  return {
    movements,
    getMovementsByUserAuth,
    getMovementsByUserId,
    getAllMovements
  };
};

export default useMovements;
