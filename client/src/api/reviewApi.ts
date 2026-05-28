import { api } from "./client";

export const fetchReviewQueue = async () => {
  const response = await api.get("/review/queue");

  return response.data;
};
