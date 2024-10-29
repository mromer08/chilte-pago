import { useForm } from "react-hook-form";

const ApplicationForm = () => {

    return (
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-12">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="gt.png" alt="eCommerce GT" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {admin
                    ? edit._id
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
  
                <div className="col-span-full">
                  <InputLabel htmlFor="email" value="Correo electronico" />
                  <TextInput
                    id="email"
                    readOnly={edit._id ? true : false}
                    {...register("email", {
                      required: "Correo electronico es requerido",
                      pattern: { value: EMAIL_REGEX, message: "Formato inválido" },
                    })}
                  />
                  <InputError message={errors.email?.message} />
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
                    <InputLabel htmlFor="rol" value="Rol" />
                    <SelectInput
                      id="rol"
                      options={[
                        { value: ROLES.Admin, label: "Admin" },
                        { value: ROLES.Delivery, label: "Delivery" },
                      ]}
                      {...register("rol")}
                    />
                  </div>
                )}
              </div>
  
              <PrimaryButton>{edit._id ? "Editar cuenta" : "Crear cuenta"}</PrimaryButton>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    );
};

export default ApplicationForm;