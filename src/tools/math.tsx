export const rounding = (value: number): number => {
  const v = Math.floor(Number(value) * 100) / 100;

  return v === 0 ? v : +(Math.floor(Number(v) * 100) / 100).toFixed(2);
};
