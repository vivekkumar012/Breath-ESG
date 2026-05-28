import SeverityBadge from "./SeverityBadge";

const rows = [
  {
    id: "REC100",
    source: "SAP",
    issue: "Negative diesel quantity",
    severity: "HIGH",
  },
  {
    id: "REC101",
    source: "UTILITY",
    issue: "Missing meter ID",
    severity: "MEDIUM",
  },
];

const ReviewTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left">
            <th className="p-4">Record ID</th>

            <th className="p-4">Source</th>

            <th className="p-4">Issue</th>

            <th className="p-4">Severity</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="p-4">{row.id}</td>

              <td className="p-4">{row.source}</td>

              <td className="p-4">{row.issue}</td>

              <td className="p-4">
                <SeverityBadge severity={row.severity} />
              </td>

              <td className="p-4 space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Approve
                </button>

                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
