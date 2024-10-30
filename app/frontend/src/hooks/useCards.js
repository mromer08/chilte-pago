import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

const CARDS_URL = "/payment-method";
const useCards = () => {
  const axiosPrivate = useAxiosPrivate();
  const [cards, setCards] = useState([]);

  const getAllCards = () => {
    axiosPrivate
      .get(`${CARDS_URL}/user`)
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  };

  const createNewCard = async (card) => {
    axiosPrivate
      .post(CARDS_URL, card)
      .then((res) => {
        getAllCards();
        toast.success('Metodo de pago vinculado correctamente!');
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error: ${error.response?.data?.message || 'Error al vincular metodo de pago'}`);
      });
  }

  const deleteCard = async (id) => {
    axiosPrivate
      .delete(`${CARDS_URL}/${id}`, { data: { id } })
      .then((res) => {
        getAllCards();
        toast.success('Metodo de pago eliminado correctamente!');
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error: ${error.response?.data?.message || 'Error al eliminar metodo de pago'}`);
      });
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return {
    cards,
    createNewCard,
    deleteCard
  };
};

export default useCards;