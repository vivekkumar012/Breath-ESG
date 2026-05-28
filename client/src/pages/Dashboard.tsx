import AppLayout from "../layouts/AppLayout";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <AppLayout>
      <PageHeader
        title="ESG Ingestion Dashboard"
        subtitle="Monitor ingestion quality and analyst review workflows"
      />

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Records" value="12,420" />

        <StatCard title="Flagged" value="42" />

        <StatCard title="Pending Review" value="104" />

        <StatCard title="Approved" value="11,903" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3">Source</th>

              <th className="pb-3">Records</th>

              <th className="pb-3">Status</th>

              <th className="pb-3">Uploaded</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">SAP Export</td>

              <td>4200</td>

              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Review Needed
                </span>
              </td>

              <td>2 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
