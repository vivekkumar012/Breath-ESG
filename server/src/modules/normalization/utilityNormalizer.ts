export const normalizeUtilityRecord = (row: any) => {
  return {
    activityType: "electricity",
    scope: "SCOPE_2",
    normalizedUnit: "kwh",
    normalizedValue: Number(row.kwh),
    normalizedPayload: {
      meterId: row.meter_id,
      billingPeriod: {
        start: row.start_date,
        end: row.end_date,
      },
    },
  };
};