import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

const USERS_URL = "/user";

const useUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  // Obtener todos los usuarios
  const getAllUsers = () => {
    axiosPrivate
      .get(USERS_URL)
      .then((res) => setUsers(res.data))
      .catch((error) => {
        console.log(error);
        toast.error(`Error al obtener usuarios: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  // Crear un nuevo usuario
  const createUser = async (userData) => {
    axiosPrivate
      .post(USERS_URL, userData)
      .then((res) => {
        getAllUsers(); // Refrescar la lista de usuarios
        toast.success('Usuario registrado correctamente!');
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error al registrar usuario: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  // Actualizar un usuario
  const updateUser = async (id, userData) => {
    axiosPrivate
      .put(`${USERS_URL}/${id}`, userData)
      .then((res) => {
        getAllUsers(); // Refrescar la lista de usuarios
        toast.success('Usuario actualizado correctamente!');
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error al actualizar usuario: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  // Eliminar un usuario
  const deleteUser = async (id) => {
    axiosPrivate
      .delete(`${USERS_URL}/${id}`)
      .then((res) => {
        getAllUsers(); // Refrescar la lista de usuarios
        toast.success('Usuario eliminado correctamente!');
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error al eliminar usuario: ${error.response?.data?.message || 'Error desconocido'}`);
      });
  };

  // Obtener usuarios al montar el hook
  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    createUser,
    updateUser,
    deleteUser
  };
};

export default useUsers;
