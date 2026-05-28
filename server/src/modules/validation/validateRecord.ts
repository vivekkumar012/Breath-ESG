export const validateRecord = (record: any) => {
  const issues = [];

  if (record.normalizedValue < 0) {
    issues.push({
      message: "Negative consumption detected",
      severity: "HIGH",
    });
  }

  if (!record.normalizedUnit) {
    issues.push({
      message: "Missing normalized unit",
      severity: "MEDIUM",
    });
  }

  return issues;
};