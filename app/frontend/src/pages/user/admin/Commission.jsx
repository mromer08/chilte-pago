import React from "react";
import useReports from "../../../hooks/useReports";
import { priceFormatter } from "../../../utils/priceFormatter";

const CommissionsReport = () => {
  const { totalCommissions, getTotalCommissions } = useReports();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Reporte de Comisiones</h1>
      <p className="text-lg">
        Total de Ganancias en Comisiones: <span className="font-semibold">{priceFormatter.format(totalCommissions)}</span>
      </p>
      <button
        onClick={getTotalCommissions}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Actualizar
      </button>
    </div>
  );
};

export default CommissionsReport;
