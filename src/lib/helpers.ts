export const round = <T extends number | undefined>(
  num: T,
  decimalPlaces: number = 2
): T => {
  if (typeof num === "number") {
    const multiplier = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(num * multiplier) / multiplier;
    return roundedValue as T;
  } else {
    return undefined as T;
  }
};
