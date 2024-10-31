import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { ROLES } from "../App";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import InputLabel from "../components/InputLabel";
import TextInput from "../components/TextInput";
import InputError from "../components/InputError";
import PrimaryButton from "../components/PrimaryButton";
import SelectInput from "../components/SelectInput";

// const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = true;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = true;
const REGISTER_URL = "/auth/register";

const Register = ({ admin = false, updateUser, setEdit,   edit = {
  username: "",
  firstname: "",
  lastname: "",
  role: "",
}, }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/users";
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      firstname: edit.firstname || "",
      lastname: edit.lastname || "",
      username: edit.username || "",
      password: "",
      confirm_pwd: "",
      rol: edit.role || ROLES.Admin,
    },
  });

  const onSubmit = async (data) => {
    const { firstname, lastname, username, password, rol, companyCode } = data;
    let newEmail=""
    try {
      if (!admin) {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({ username, password, firstname, lastname, companyCode }),
          { headers: { "Content-Type": "application/json" } }
        );
        newEmail=response.data.email;
        toast.success(`Usuario registrado exitosamente. ${response.data.email} `);
      } else {
        const rolObj = {};
        for (const key in ROLES) {
          if (ROLES[key].toString() === rol.toString()) rolObj[key] = Number(rol);
        }

        if (edit.id) {
          await updateUser({
            id: edit.id,
            password: password.trim().length > 3 ? password : false,
            firstname,
            lastname,
            roles: rolObj,
          });
          setEdit({});
          toast.success("Usuario actualizado.");
        } else {
          await axiosPrivate.post("/api/users", {
            password,
            firstname,
            lastname,
            roles: rolObj,
          });
          toast.success("Empleado registrado exitosamente.");
        }
        navigate(from, { replace: true, state: { newEmail } });

      }

      reset();
      navigate(auth?.roles?.includes(ROLES.Admin) ? "/users" : "/login");
    } catch (err) {
      console.log(err)
      const message =
        !err?.response
          ? "No Server Response"
          : err.response?.status === 409
          ? "Ya existe una cuenta con ese correo"
          : "Fallo el registro de usuario";
      toast.error(message);
    }
  };

  const password = watch("password");

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-20 w-auto" src="gt.png" alt="eCommerce GT" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {admin
                  ? edit.id
                    ? "Editar cuenta de empleado"
                    : "Nueva cuenta de empleado"
                  : "Crea tu cuenta de eCommerce GT"}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <InputLabel htmlFor="firstname" value="Nombre" />
                <TextInput
                  id="firstname"
                  {...register("firstname", { required: "Nombre es requerido" })}
                />
                <InputError message={errors.firstname?.message} />
              </div>

              <div className="sm:col-span-3">
                <InputLabel htmlFor="lastname" value="Apellido" />
                <TextInput
                  id="lastname"
                  {...register("lastname", { required: "Apellido es requerido" })}
                />
                <InputError message={errors.lastname?.message} />
              </div>

              <div className="sm:col-span-3">
                <InputLabel htmlFor="username" value="Username" />
                <TextInput
                  id="username"
                  {...register("username", { required: "Username es requerido" })}
                />
                <InputError message={errors.username?.message} />
              </div>

              <div className="sm:col-span-3">
                <InputLabel htmlFor="lastname" value="Codigo de empresa" />
                <TextInput
                  id="companyCode"
                  {...register("companyCode", { required: "Apellido es requerido" })}
                />
                <InputError message={errors.companyCode?.message} />
              </div>

              <div className="sm:col-span-3">
                <InputLabel htmlFor="password" value="Contraseña" />
                <TextInput
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Contraseña es requerida",
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
                    validate: (value) => value === password || "Las contraseñas no coinciden",
                  })}
                />
                <InputError message={errors.confirm_pwd?.message} />
              </div>

              {admin && (
                <div className="col-span-full">
                  <InputLabel htmlFor="role" value="Rol" />
                  <SelectInput
                    id="rol"
                    options={[
                      { value: ROLES.Admin, label: "Admin" },
                      { value: ROLES.User, label: "Cliente" },
                    ]}
                    {...register("role")}
                  />
                </div>
              )}
            </div>

            <PrimaryButton>{edit.id ? "Editar cuenta" : "Crear cuenta"}</PrimaryButton>
          </div>
        </form>

        {!admin && (
          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya estás registrado?{" "}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Inicia Sesión
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Register;
