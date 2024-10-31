import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const USER_URL = "/user"; // Ruta base para operaciones con usuarios

const useProfile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [userAuth, setUserAuth] = useState(null);

    // Función para obtener el perfil del usuario
    const getUserProfile = () => {
        axiosPrivate
            .get(`${USER_URL}/profile`)
            .then((response) => {
                setUserAuth(response.data); // Guardar la información del usuario en el estado
            })
            .catch((error) => {
                console.error(error);
                toast.error(`Error al obtener el perfil: ${error.response?.data?.message || error.message}`);
            });
    };

    // Función para actualizar el perfil del usuario
    const updateUserProfile = (id, updatedData) => {
        axiosPrivate
            .put(`${USER_URL}/${id}`, updatedData)
            .then((response) => {
                setUserAuth(response.data); // Actualizar el estado con la nueva información del usuario
                toast.success('Perfil actualizado correctamente');
            })
            .catch((error) => {
                console.error(error);
                toast.error(`Error al actualizar el perfil: ${error.response?.data?.message || error.message}`);
            });
    };

    const deleteUser = (id) => {
        axiosPrivate
            .delete(`${USER_URL}/${id}`)
            .then(() => {
                // Opcionalmente, puedes actualizar el estado o realizar otra acción
                toast.success('Usuario eliminado correctamente');
            })
            .catch((error) => {
                console.error(error);
                toast.error(`Error al eliminar el usuario: ${error.response?.data?.message || 'La cuenta tiene fondos'}`);
            });
    };

    // Usar useEffect para obtener el perfil del usuario al montar el hook
    useEffect(() => {
        getUserProfile();
    }, []);

    return {
        userAuth,
        updateUserProfile,
        deleteUser
    };
};

export default useProfile;
