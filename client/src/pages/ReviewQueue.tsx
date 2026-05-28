import AppLayout from "../layouts/AppLayout";
import PageHeader from "../components/PageHeader";
import ReviewTable from "../components/ReviewTable";

const ReviewQueue = () => {
  return (
    <AppLayout>
      <PageHeader title="Review Queue" subtitle="Analyst approval workflow" />

      <ReviewTable />
    </AppLayout>
  );
};

export default ReviewQueue;
