import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

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

  const createNewCard = (card) => {
    console.log(card);
    axiosPrivate
      .post(CARDS_URL, card)
      .then((res) => {
        getAllCards();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteCard = async (id) => {
    axiosPrivate
      .delete(CARDS_URL, { data: { id } })
      .then((res) => {
        getAllCards();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
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