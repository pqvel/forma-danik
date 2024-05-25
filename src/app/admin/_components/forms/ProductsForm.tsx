"use client";
import { FC, useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { ProductAndCategory } from "@prisma/client";
import { changeProductsAndCategories } from "@/app/actions/productAndCategory";
import { getNumberPercent } from "@/tools/percentValue";
import { rounding } from "@/tools/math";

type Props = {
  initialProducts: ProductAndCategory[];
};

const ProductsForm: FC<Props> = ({ initialProducts = [] }) => {
  const [isEdited, setEdited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] =
    useState<ProductAndCategory[]>(initialProducts);

  const onSave = async () => {
    setLoading(true);
    await changeProductsAndCategories(products).then(() => {
      setEdited(false);
      setLoading(false);
    });
  };

  const addProduct = () => {
    setEdited(true);
    setProducts([...products, { id: Math.random(), title: "", percents: 0 }]);
    setEdited(true);
  };

  const deleteProduct = (id: number) => {
    setEdited(true);
    setProducts((products) => products.filter((p) => p.id !== id));
  };

  const changeProductTitle = (id: number, value: string) => {
    setEdited(true);
    console.log(value);
    setProducts((products) =>
      products.map((p) => (p.id === id ? { ...p, title: value } : p))
    );
  };

  const changeProductPercent = (id: number, value: number) => {
    setEdited(true);
    setProducts((products) =>
      products.map((p) => (p.id === id ? { ...p, percents: value } : p))
    );
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form>
        <table className=" w-full">
          <thead className="flex bg-slate-200 w-full font-semibold rounded-t-lg">
            <tr className="flex space-x-4 w-full px-4 py-2">
              <td className=" w-full text-start">Товар и его категория</td>
              <td className=" w-1/3 text-start">Комиссия Родны Кут, %</td>{" "}
              <td className="flex w-[98px] min-w-[98px] text-start">
                Действия
              </td>
            </tr>
          </thead>
          <tbody className="flex flex-col w-full border border-gray-300">
            {products?.map((product) => (
              <ProductItem
                product={product}
                onDelete={() => deleteProduct(product.id)}
                onChangeTitle={(value) => changeProductTitle(product.id, value)}
                onChangePercent={(value) =>
                  changeProductPercent(product.id, value)
                }
                key={product.id}
              />
            ))}
          </tbody>
          <tfoot className="flex bg-slate-200">
            <tr className="flex items-center justify-center w-full py-2 px-2 space-x-4">
              <td>
                <Button onClick={addProduct}>Добавить</Button>
              </td>
              <td>
                <Button onClick={onSave} disabled={!isEdited || loading}>
                  {loading ? " Загрузка" : "Сохранить"}
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </Form>
    </Card>
  );
};

export default ProductsForm;

type ProductItemProps = {
  product: ProductAndCategory;
  onDelete: () => void;
  onChangeTitle: (value: string) => void;
  onChangePercent: (value: number) => void;
};

const ProductItem: FC<ProductItemProps> = ({
  product: { title, percents },
  onDelete,
  onChangeTitle,
  onChangePercent,
}) => {
  return (
    <tr className="flex space-x-4 w-full even:bg-blue-100 px-4 py-2">
      <td className="w-full">
        <Input
          onChange={(e) => onChangeTitle(e.target.value)}
          style={{ width: "100%" }}
          value={title}
        />
      </td>
      <td className=" w-1/3">
        <InputNumber
          style={{ width: "100%" }}
          value={rounding(percents * 100)}
          onChange={(value) => onChangePercent(getNumberPercent(value))}
        />
      </td>
      <td className=" flex justify-end w-[98px]">
        <Button className="w-24" type="primary" danger onClick={onDelete}>
          Удалить
        </Button>
      </td>
    </tr>
  );
};
