"use server";
import { Container } from "@/components/ui/wrappers";
import { FC } from "react";
import ProductsForm from "./_components/forms/ProductsForm";
import Title from "antd/es/typography/Title";
import db from "../../../db/db";
import TaxForRubForm from "./_components/forms/TaxForRubForm";
import AdverstingForRubForm from "./_components/forms/AdverstingForRubForm";
import GabaritsForm from "./_components/forms/GabaritsForm";

const getAllData = async () => {
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

  const productAndCategory = await db.productAndCategory.findMany();

  const gabarits = await db.gabarit.findMany();

  return {
    taxForRub: taxForRub,
    advertisingForRub: advertisingForRub,
    productAndCategory: productAndCategory || [],
    gabarits: gabarits || [],
  };
};

const AdminPage: FC = async () => {
  const { taxForRub, advertisingForRub, productAndCategory, gabarits } =
    await getAllData();
  return (
    <Container>
      <Title color="#464646">Панель администрирования</Title>
      <TaxForRubForm defaultValue={taxForRub!.percents} />
      <AdverstingForRubForm defaultValue={advertisingForRub!.percents} />
      <ProductsForm initialProducts={productAndCategory} />
      <GabaritsForm initialGabarits={gabarits} />
    </Container>
  );
};

export default AdminPage;
