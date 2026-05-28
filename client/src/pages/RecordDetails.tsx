import { useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

const RecordDetails = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold mb-8">Record Details</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Raw Payload</h2>

          <pre className="text-sm">
            {JSON.stringify(
              {
                id,
                source: "SAP",
                quantity: -50,
              },
              null,
              2,
            )}
          </pre>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Normalized Payload</h2>

          <pre className="text-sm">
            {JSON.stringify(
              {
                normalizedUnit: "liters",
                normalizedValue: -50,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h2 className="text-2xl font-semibold mb-4">Audit Trail</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3">Field</th>

              <th className="pb-3">Old Value</th>

              <th className="pb-3">New Value</th>

              <th className="pb-3">Changed By</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-4">normalizedValue</td>

              <td>-500</td>

              <td>-50</td>

              <td>analyst@company.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default RecordDetails;
