const airportCoordinates: Record<string, { lat: number; lon: number }> = {
  DEL: { lat: 28.5562, lon: 77.1 },
  BOM: { lat: 19.0896, lon: 72.8656 },
  BLR: { lat: 13.1986, lon: 77.7066 },
  HYD: { lat: 17.2403, lon: 78.4294 },
};

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const calculateDistance = (origin: string, destination: string) => {
  const from = airportCoordinates[origin];
  const to = airportCoordinates[destination];

  if (!from || !to) {
    return null;
  }

  const earthRadiusKm = 6371;

  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadiusKm * c);
};
