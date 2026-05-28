import express from "express";
import cors from "cors";

import ingestionRoutes from "./routes/ingestion.routes";
import reviewRoutes from "./routes/review.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Breathe ESG API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/ingestion", ingestionRoutes);

app.use("/api/review", reviewRoutes);

export default app;
