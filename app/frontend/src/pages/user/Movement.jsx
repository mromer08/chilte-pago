import { useForm } from "react-hook-form";
import MovementTable from "../partials/movements/MovementTable";
import useMovements from "../../hooks/useMovement";

export default function Movement() {

    const {
        movements,
        getMovementsByUserAuth
      } = useMovements();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            startDate: new Date().toLocaleDateString("en-CA"),
            endDate: new Date().toLocaleDateString("en-CA"),
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="w-3/4 mx-auto max-w-screen-md py-10">
                <h1 className="text-2xl font-bold mb-4 text">MOVIMIENTOS</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2 sm:col-start-1">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Fecha inicial
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    id="startDate"
                                    {...register("startDate", { required: true })}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Fecha final
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    id="endDate"
                                    {...register("endDate", { required: true })}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mt-8">
                                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            <MovementTable movements={movements}/>
        </>
    );
}