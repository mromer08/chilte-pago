import { useNavigate } from "react-router-dom"
import PrimaryButton from "../components/PrimaryButton";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Sin permisos</h1>
            <br />
            <p>No tienes permisos para acceder al ruta solicitada.</p>
            <div>
                <PrimaryButton onClick={goBack}>Go Back</PrimaryButton>
            </div>
        </section>
    )
}

export default Unauthorized