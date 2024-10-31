import React from "react";
import useReports from "../../../hooks/useReports";

const UsersReport = () => {
  const { totalUsers, getTotalUsers } = useReports();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Reporte de Usuarios Registrados</h1>
      <p className="text-lg">
        Total de Usuarios Registrados: <span className="font-semibold">{totalUsers}</span>
      </p>
      <button
        onClick={getTotalUsers}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Actualizar
      </button>
    </div>
  );
};

export default UsersReport;
