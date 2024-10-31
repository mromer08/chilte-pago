import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import InputLabel from "../../../components/InputLabel"; 
import TextInput from "../../../components/TextInput";
import PrimaryButton from "../../../components/PrimaryButton";
import InputError from "../../../components/InputError";
import useBalance from "../../../hooks/useBalance";
import { priceFormatter } from "../../../utils/priceFormatter";

const BalanceForm = ({userBalance}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { amount: 0 }
  });

  const { balance, makeDeposit } = useBalance();

  const onSubmit = async (data) => {
    makeDeposit(data.amount); // Realiza el depósito utilizando la cantidad ingresada
  };

  return (
    <section>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Depositar ganancias
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
              <InputLabel htmlFor="currentBalance" value="Balance actual" />
              <div className="mt-2">
                <TextInput
                  id="currentBalance"
                  type="text"
                  value={`${priceFormatter.format(balance)}`} // Mostrar balance en formato de dinero
                  readOnly
                />
              </div>
            </div>
                    <div>
                          <InputLabel htmlFor="amount" value="Cantidad a depositar" />
                          <div className="mt-2">
                              <TextInput
                                  id="amount"
                                  type="text" // Cambiado a texto para permitir números decimales libremente
                                  {...register("amount", {
                                      required: "Ingrese una cantidad",
                                      validate: (value) => {
                                          const parsedValue = parseFloat(value);
                                          if (isNaN(parsedValue)) {
                                              return "Ingrese un número válido";
                                          }
                                          if (parsedValue <= 0) {
                                              return "La cantidad debe ser mayor a 0";
                                          }
                                          if (parsedValue > balance) {
                                              return `La cantidad no debe exceder el balance actual de $${balance}`;
                                          }
                                          return true;
                                      },
                                  })}
                                  autoComplete="off"
                              />

                              <InputError message={errors.amount?.message} />
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                        <PrimaryButton type="submit">
                        Depositar
                    </PrimaryButton>
                        </div>
                    </div>

                    
                </form>
            </div>
        </div>
    </section>
);
};

export default BalanceForm;
