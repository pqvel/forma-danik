"use server";
import { ProductAndCategory } from "@prisma/client";
import db from "../../../db/db";
import { revalidatePath } from "next/cache";

export const changeProductsAndCategories = async (
  products: ProductAndCategory[]
) => {
  await db.productAndCategory.deleteMany();

  const data = await db.productAndCategory.createMany({
    data: products.map((product) => ({
      title: product.title,
      percents: product.percents,
    })),
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return data;
};
