import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRole} ) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth.roles);
    return (
        auth?.role===allowedRole
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;