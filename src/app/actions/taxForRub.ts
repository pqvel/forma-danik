"use server";
import db from "../../../db/db";

export const setTaxForRub = async (value: number) => {
  return await db.taxForRub.update({
    where: {
      id: 1,
    },
    data: {
      percents: value,
    },
  });
};

export const getTaxForRub = async () => {
  return await db.taxForRub.findFirst({
    where: {
      id: 1,
    },
  });
};
