export const normalizeTravelRecord = (row: any) => {
  return {
    activityType: "business_travel",
    scope: "SCOPE_3",
    normalizedUnit: "km",
    normalizedValue: row.distance_km,
    normalizedPayload: {
      from: row.origin,
      to: row.destination,
      class: row.class,
    },
  };
};