"use server";
import db from "../../../db/db";

export const getAllData = async () => {
  const taxForRub = await db.taxForRub.findUnique({
    where: {
      id: 1,
    },
  });

  const advertisingForRub = await db.advertisingForRub.findUnique({
    where: {
      id: 1,
    },
  });

  const productAndCategory = await db.productAndCategory.findMany({});

  const gabarits = await db.gabarit.findMany({});

  return {
    taxForRub: taxForRub,
    advertisingForRub: advertisingForRub,
    productAndCategory: productAndCategory || [],
    gabarits: gabarits || [],
  };
};
