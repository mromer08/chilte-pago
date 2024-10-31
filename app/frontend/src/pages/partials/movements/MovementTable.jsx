import { formatDate } from "../../../utils/dateFormatter";
import { priceFormatter } from "../../../utils/priceFormatter";

export default function MovementTable({movements=[]}) {
    return (
        <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="font-bold w-1/6 border-b border-gray-200 py-4">ID</th>
            <th className="font-bold w-1/6 border-b border-gray-200 py-4">
              Typo
            </th>
            <th className="font-bold w-3/6 border-b border-gray-200 py-4">
              Total
            </th>
            <th className="font-bold w-3/6 border-b border-gray-200 py-4">
              Descripcion
            </th>
            <th className="font-bold w-3/6 border-b border-gray-200 py-4">
              Status
            </th>
            <th className="font-bold w-3/6 border-b border-gray-200 py-4">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement, index) => (
            <tr key={index}>
              <td className="font-bold text-center border-b border-gray-200 py-4">
                {movement.id}
              </td>
              <td className="text-gray-500 border-b border-gray-200 py-4">
              {movement.type}
              </td>
              <td className="text-gray-500 text-center border-b border-gray-200 py-4">
                {priceFormatter.format(movement.totalAmount)}
              </td>
              <td className="text-gray-500 text-center border-b border-gray-200 py-4">
                {movement.description}
              </td>
              <td className="text-gray-500 text-center border-b border-gray-200 py-4">
                {movement.status}
              </td>
              <td className="text-gray-500 text-center border-b border-gray-200 py-4">
                {formatDate(movement.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}