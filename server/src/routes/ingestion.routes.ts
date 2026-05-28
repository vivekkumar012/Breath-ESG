import express from "express";
import multer from "multer";
import { parseCSV } from "../utils/csv";
import { normalizeSAPRecord } from "../modules/normalization/sapNormalizer";
import { validateRecord } from "../modules/validation/validateRecord";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/sap", upload.single("file"), async (req, res) => {
  const rows = await parseCSV(req.file!.path);

  const normalized = rows.map((row) => {
    const data = normalizeSAPRecord(row);

    return {
      raw: row,
      normalized: data,
      issues: validateRecord(data),
    };
  });

  res.json(normalized);
});

export default router;
