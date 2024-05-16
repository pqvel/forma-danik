export const getNumberPercent = (percent: number | null | undefined) => {
  return percent ? percent / 100 : 0;
};

export const getPercentNumber = (number: number | null | undefined) => {
  return number ? number * 100 : 0;
};
