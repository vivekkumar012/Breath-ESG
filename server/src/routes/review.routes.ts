import express from "express";

const router = express.Router();

router.get("/queue", async (_, res) => {
  res.json({
    message: "Review queue endpoint",
  });
});

router.post("/:id/approve", async (req, res) => {
  res.json({
    message: "Record approved",
  });
});

export default router;
