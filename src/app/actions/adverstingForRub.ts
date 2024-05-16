"use server";
import db from "../../../db/db";

export const setAdvertisingForRub = async (value: number) => {
  return await db.advertisingForRub.update({
    where: {
      id: 1,
    },
    data: {
      percents: value,
    },
  });
};
