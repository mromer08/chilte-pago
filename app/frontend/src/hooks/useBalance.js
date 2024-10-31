import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

const PROFILE_URL = "/user/profile";
const DEPOSIT_URL = "/deposit";

const useBalance = () => {
  const axiosPrivate = useAxiosPrivate();
  const [balance, setBalance] = useState(0);

  // Obtener el balance del usuario
  const getBalance = () => {
    axiosPrivate
      .get(PROFILE_URL)
      .then((res) => setBalance(res.data.balance))
      .catch((error) => {
        console.error(error);
        toast.error(`Error al obtener balance: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  // Realizar un depósito
  const makeDeposit = (amount) => {
    axiosPrivate
      .post(DEPOSIT_URL, { amount })
      .then((res) => {
        setBalance((prevBalance) => prevBalance - amount);
        toast.success("Depósito realizado exitosamente!");
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error en depósito: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  useEffect(() => {
    getBalance();
  }, []);

  return {
    balance,
    makeDeposit,
  };
};

export default useBalance;
