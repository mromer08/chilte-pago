import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

export default function CardButton({ title, value, link="/" }) {
    const navigate =useNavigate();
    const handleRedirect = () => {
        // Si "link" está definido y no está vacío, redirige a "link"; de lo contrario, redirige a "/"
        navigate(link);
      };

  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {value}
        </div>
        <div className="space-x-1">
        <PrimaryButton onClick={handleRedirect}>
            Ver mas
        </PrimaryButton>
        </div>
      </div>
    </div>
  );
}