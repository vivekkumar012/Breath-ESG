import { useState } from "react";

import AppLayout from "../layouts/AppLayout";
import PageHeader from "../components/PageHeader";
import { uploadSAPFile } from "../api/ingestionApi";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadSAPFile(file);

      alert("Upload successful");
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Data Ingestion"
        subtitle="Upload enterprise sustainability datasets"
      />

      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">Upload SAP CSV</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </AppLayout>
  );
};

export default UploadPage;
