import { api } from "./client";

export const uploadSAPFile = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/ingestion/sap", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadUtilityFile = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/ingestion/utility", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const syncTravelData = async () => {
  const response = await api.post("/ingestion/travel/sync");

  return response.data;
};

export const fetchIngestionHistory = async () => {
  const response = await api.get("/ingestion/history");

  return response.data;
};

export const fetchIngestionBatch = async (batchId: string) => {
  const response = await api.get(`/ingestion/batch/${batchId}`);

  return response.data;
};
