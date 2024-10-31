import { useForm } from "react-hook-form";
import { ROLES } from "../../App";
import InputLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";
import InputError from "../../components/InputError";
import PrimaryButton from "../../components/PrimaryButton";
import useProfile from "../../hooks/useProfile";
import { useEffect } from "react";
import DangerButton from "../../components/DangerButton";

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = true;

const EditProfile = () => {
    const { userAuth, updateUserProfile, deleteUser } = useProfile(); // Usa el hook para obtener datos del perfil
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            firstname: userAuth?.firstname || "",
            lastname: userAuth?.lastname || "",
            email: userAuth?.email || "", // Suponiendo que el email está en userAuth
            password: "",
            confirm_pwd: "",
            rol: userAuth?.role || ROLES.Admin,
        },
    });

    // Resetea los valores del formulario cuando userAuth cambia
    useEffect(() => {
        reset({
            firstname: userAuth?.firstname || "",
            lastname: userAuth?.lastname || "",
            email: userAuth?.email || "",
            rol: userAuth?.role || ROLES.Admin,
        });
    }, [userAuth, reset]);

    const onSubmit = async (data) => {
        console.log(data);
        updateUserProfile(userAuth.id, data); // Actualiza el perfil
    };

    const handleDeleteUser = () => {
        const userId = userAuth.id; // Asegúrate de que `userAuth` tenga la propiedad `id`
        deleteUser(userId);
    };

    const password = watch("password");

    return (
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-12">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Editar Cuenta
                            </h2>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <InputLabel htmlFor="firstname" value="Nombre" />
                                <TextInput
                                    id="firstname"
                                    {...register("firstname", { required: "Ingrese su nombre" })}
                                />
                                <InputError message={errors.firstname?.message} />
                            </div>

                            <div className="sm:col-span-3">
                                <InputLabel htmlFor="lastname" value="Apellido" />
                                <TextInput
                                    id="lastname"
                                    {...register("lastname", { required: "Ingrese su apellido" })}
                                />
                                <InputError message={errors.lastname?.message} />
                            </div>

                            <div className="sm:col-span-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    value={userAuth?.email || ""}
                                    readOnly
                                />
                                <InputError message={errors.email?.message} />
                            </div>

                            <div className="sm:col-span-3">
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        pattern: { value: PWD_REGEX, message: "Formato inválido" },
                                    })}
                                />
                                <InputError message={errors.password?.message} />
                            </div>

                            <div className="sm:col-span-3">
                                <InputLabel htmlFor="confirm_pwd" value="Confirmación" />
                                <TextInput
                                    id="confirm_pwd"
                                    type="password"
                                    {...register("confirm_pwd", {
                                        validate: (value) => {
                                            // Solo valida si password tiene un valor
                                            if (password) {
                                                return value === password || "Las contraseñas no coinciden";
                                            }
                                            return true; // Si password está vacío, no aplica validación
                                        },
                                    })}
                                />

                                <InputError message={errors.confirm_pwd?.message} />
                            </div>
                        </div>

                        <PrimaryButton>Editar Cuenta</PrimaryButton>
                    </div>
                </form>

                <div className="sm:col-span-full">
                                <DangerButton onClick={handleDeleteUser}>Eliminar Cuenta</DangerButton>
                                <InputError message={errors.email?.message} />
                </div>
                
            </div>
        </section>
    );
};

export default EditProfile;
