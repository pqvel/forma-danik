"use server";
import { revalidatePath } from "next/cache";
import db from "../../../db/db";

export const setAdvertisingForRub = async (value: number) => {
  const data = await db.advertisingForRub.update({
    where: {
      id: 1,
    },
    data: {
      percents: value,
    },
  });

  revalidatePath("/");

  return data;
};
