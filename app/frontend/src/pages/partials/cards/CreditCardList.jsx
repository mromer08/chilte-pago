import { useState } from "react";
import {
  CreditCardIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import CreditCardForm from "./CreditCardForm";
import useCards from "../../../hooks/useCards";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"; 
import { useNavigate } from "react-router-dom";

export default function CreditCardList() {
  const { cards, createNewCard, deleteCard } = useCards();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setShowAddCardForm(false);
  };

  const handleAddCardSelection = () => {
    setSelectedCard(null);
    setShowAddCardForm(true);
  };

  const createNewSale = (sale) => {
    axiosPrivate
      .post("/api/sales", sale)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePayment = () => {
    if (selectedCard) {
      const total = cart.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      const transformedArr = cart.map(({ id, quantity }) => ({
        product: id,
        quantity,
      }));
      createNewSale({ products: transformedArr, total, card: selectedCard });
      navigate('/')
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-gray-900">Mis tarjetas</h2>
      </div>
      <div className="mt-8 space-y-12">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cards.map((card) => (
              <li key={card.id} className="flex py-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={card.id}
                    name="card"
                    className="mr-2"
                    checked={selectedCard?.id === card.id}
                    onChange={() => handleCardSelection(card)}
                  />
                  <label htmlFor={card.id}>
                    <CreditCardIcon className="w-10" />
                  </label>
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-bold text-indigo-900">
                      <h3>{`**** ${card.lastFour}`}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex space-x-3 text-gray-500">
                        
                        <p>Tipo: {" "}
                            {card.type}
                        </p>
                      {/* <p>
                        Expira{" "}
                        {new Date(card.expirationDate).toLocaleDateString(
                          "en-GB",
                          { month: "2-digit", year: "numeric" }
                        )}
                      </p> */}
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => deleteCard(card)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <li key="addCard" className="flex py-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="addCard"
                  name="card"
                  className="mr-2"
                  checked={showAddCardForm}
                  onChange={handleAddCardSelection}
                />
                <label htmlFor="addCard">
                  <PlusCircleIcon className="w-10" />
                </label>
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-bold text-indigo-900">
                    <h3>Agregar tarjeta</h3>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            disabled={!selectedCard}
            onClick={handlePayment}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:pointer-events-none"
          >
            Pagar
          </button>
          {showAddCardForm && <CreditCardForm createNewCard={createNewCard} />}
        </div>
      </div>
    </div>
  );
}