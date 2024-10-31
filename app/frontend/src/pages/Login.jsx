import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import InputLabel from "../components/InputLabel";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import InputError from "../components/InputError";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      );
      const { token, role, fullname, balance } = response.data;
      console.log(response.data);
      setAuth({ ...data, role, token, fullname, balance });
      toast.success("Bienvenido");
      navigate(from, { replace: true });
    } catch (err) {
        
      if (!err?.response) {
          toast.error("Sin respuesta del servidor");
      } else {
          const { status, data } = err.response;
          const errorMessage = data?.message || "Error al iniciar sesión";
          
          if (status === 400) {
              toast.error("Faltan correo electrónico o contraseña");
          } else if (status === 401 || status === 404) {
              toast.error("Credenciales incorrectas");
          } else {
              toast.error(errorMessage);
          }
      }
    }
  };

  useEffect(() => {
    const emailInput = document.getElementById("email");
    emailInput && emailInput.focus();
  }, []);

  return (
    <section>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="gt.png" alt="ChiltePago" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicio de Sesión
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                        <div className="mt-2">
                            <TextInput
                                id="email"
                                type="text"
                                {...register("email", { required: "Correo electrónico requerido" })}
                                autoComplete="off"
                            />
                            <InputError message={errors.email?.message} />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <div className="mt-2">
                            <TextInput
                                id="password"
                                type="password"
                                {...register("password", { required: "Contraseña requerida" })}
                            />
                            <InputError message={errors.password?.message} />
                        </div>
                    </div>

                    <PrimaryButton type="submit">
                        Iniciar sesión
                    </PrimaryButton>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    </section>
);
};

export default Login;
