export const normalizeSAPRecord = (row: any) => {
  const quantity = Number(row.Menge || row.Quantity);

  return {
    activityType: "diesel_combustion",
    scope: "SCOPE_1",
    normalizedUnit: "liters",
    normalizedValue: quantity,
    normalizedPayload: {
      fuelType: "diesel",
      liters: quantity,
      plantCode: row.WERKS,
    },
  };
};