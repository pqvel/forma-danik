"use server";
import { revalidatePath } from "next/cache";
import db from "../../../db/db";

export const setTaxForRub = async (value: number) => {
  const data = await db.taxForRub.update({
    where: {
      id: 1,
    },
    data: {
      percents: value,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return data;
};

export const getTaxForRub = async () => {
  return await db.taxForRub.findFirst({
    where: {
      id: 1,
    },
  });
};
