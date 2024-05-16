"use server";
import { ProductAndCategory } from "@prisma/client";
import db from "../../../db/db";

export const changeProductsAndCategories = async (
  products: ProductAndCategory[]
) => {
  await db.productAndCategory.deleteMany();

  return await db.productAndCategory.createMany({
    data: products.map((product) => ({
      title: product.title,
      percents: product.percents,
    })),
  });
};
