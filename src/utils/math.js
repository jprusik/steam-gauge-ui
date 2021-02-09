export const roundToPlaces = (floatInput = 0, decimalPlaces = 0) => {
  const factorBy = Math.pow(10, decimalPlaces);

  return (Math.round(floatInput * factorBy) / factorBy);
};

export const minutesToHours = (minutes = 0, decimalPlaces = 0) =>
  !minutes || minutes === 0 ? 0 : roundToPlaces(minutes/60, decimalPlaces);

export const pricePerHourRatio = (price, playedMinutes) => {
  if (!price) {
    return 0;
  }

  if (!playedMinutes || playedMinutes < 1) {
    return price || null;
  }

  const playedHours = minutesToHours(playedMinutes, 2);

  if (playedHours < 1) {
    return price || null;
  }

  return roundToPlaces(price/playedHours, 2);
};

export const mbToGB = (sizeMB, decimalPlaces = 0) =>
  roundToPlaces(sizeMB / 1000, decimalPlaces);

export function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}
