import fs from "fs";
import { parse } from "csv-parse";

export const parseCSV = async (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const rows: any[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          trim: true,
          skip_empty_lines: true,
        }),
      )
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
