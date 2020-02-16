// Precision here suffers, but not to an extent with large impact here.
export const minutesToHours = (minutes, decimalPlaces = 0) => (minutes/60).toFixed(decimalPlaces);
