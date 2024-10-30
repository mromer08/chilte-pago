import { useForm } from "react-hook-form";
import TextInput from "../../../components/TextInput"; 
import InputLabel from "../../../components/InputLabel";
import InputError from "../../../components/InputError";
import PrimaryButton from "../../../components/PrimaryButton";
import SelectInput from "../../../components/SelectInput";

function CreditCardForm({ createNewCard }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    const [month, year] = data.expirationDate.split("/");
    const expirationDate = new Date(`20${year}`, Number(month) - 1, 1);
    data.expirationDate = expirationDate;
    createNewCard(data);
    reset();
  };

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-12">
            <div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Select de Tipo de Tarjeta */}
                <div className="col-span-full">
                  <InputLabel htmlFor="cardType">Tipo de Tarjeta</InputLabel>
                  <SelectInput
                    id="cardType"
                    {...register("type", { required: "Seleccione el tipo de tarjeta" })}
                    options={[
                      { value: "credit_card", label: "Crédito" },
                      // { value: "bank_account", label: "Débito" }
                    ]}
                  />
                  <InputError message={errors.cardType?.message} />
                </div>
                {/* Número de Tarjeta */}
                <div className="col-span-full">
                  <InputLabel htmlFor="cardNumber">Número de la tarjeta</InputLabel>
                  <TextInput
                    id="cardNumber"
                    type="text"
                    {...register("cardNumber", {
                      required: "El número de tarjeta es obligatorio",
                      pattern: { value: /^\d{16}$/, message: "Ingrese un número de tarjeta válido" }
                    })}
                    placeholder="0000 0000 0000 0000"
                  />
                  <InputError message={errors.cardNumber?.message} />
                </div>

                {/* Fecha de Expiración */}
                <div className="sm:col-span-3">
                  <InputLabel htmlFor="expirationDate">Fecha de expiración</InputLabel>
                  <TextInput
                    id="expirationDate"
                    type="text"
                    {...register("expirationDate", {
                      required: "La fecha de expiración es obligatoria",
                      pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Ingrese una fecha en formato MM/YY" }
                    })}
                    placeholder="MM/YY"
                  />
                  <InputError message={errors.expirationDate?.message} />
                </div>

                {/* Pin */}
                <div className="sm:col-span-3">
                  <InputLabel htmlFor="pin">Pin</InputLabel>
                  <TextInput
                    id="pin"
                    type="text"
                    {...register("pin", { required: "El pin es obligatorio" })}
                    placeholder="000"
                  />
                  <InputError message={errors.pin?.message} />
                </div>

                {/* Nombre del Titular */}
                <div className="col-span-full">
                  <InputLabel htmlFor="holderName">Nombre del titular</InputLabel>
                  <TextInput
                    id="holderName"
                    type="text"
                    {...register("holderName", { required: "El nombre del titular es obligatorio" })}
                    placeholder="Como aparece en la tarjeta"
                  />
                  <InputError message={errors.holderName?.message} />
                </div>
              </div>
            </div>
            {/* Botón de Enviar */}
            <div>
              <PrimaryButton type="submit">Agregar</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreditCardForm;
