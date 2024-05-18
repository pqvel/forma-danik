"use server";
import { Gabarit } from "@prisma/client";
import db from "../../../db/db";
import { revalidatePath } from "next/cache";

export const changeGabarits = async (gabarits: Gabarit[]) => {
  await db.gabarit.deleteMany({});

  const data = await db.gabarit.createMany({
    data: gabarits.map((gabarit) => ({
      title: gabarit.title,
      percentageForDelivery: gabarit.percentageForDelivery,
      warehouseStorage: gabarit.warehouseStorage,
      length: gabarit.length,
      height: gabarit.height,
      weight: gabarit.weight,
    })),
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return data;
};
