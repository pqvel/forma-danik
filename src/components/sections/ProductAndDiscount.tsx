"use client";
import { Divider, Card, Form, Row, Select, InputNumber, Col } from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import { Label } from "@/components/ui/form";
import { Container } from "@/components/ui/wrappers";
import { FC, useState } from "react";
import { ProductAndCategory } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setProductAndCategory,
  setCostPrice,
  setPriceBeforeDiscount,
  setDiscount,
  selectPriceForSell,
  selectComission,
} from "@/redux/slices/formsSlice";
import { getNumberPercent, getPercentNumber } from "@/tools/percentValue";
import { rounding } from "@/tools/math";

type Props = {
  products: ProductAndCategory[];
};

const ProductAndDiscount: FC<Props> = ({ products }) => {
  const forms = useAppSelector((state) => state.forms);
  const priceForSell = useAppSelector(selectPriceForSell) as number;
  const comission = useAppSelector(selectComission) as number;
  const dispatch = useAppDispatch();
  const handleChangeProduct = (id: number) => {
    const newValue = products.find((p) => p.id === id);
    if (newValue) dispatch(setProductAndCategory(newValue));
  };

  return (
    <Container>
      <Title
        color="#464646"
        level={1}
        style={{ fontSize: 40, fontWeight: 900 }}
      >
        Калькулятор unit экономики
      </Title>
      <Divider />
      <section className=" mb-10">
        <Title level={2}>Товар и скидки</Title>
        <p className="mb-3 max-w-4xl text-gray-600">
          Введите название товара и его категорию, закупочную цену и ту цену, по
          которой вы планируете продавать. Актуальные данные по комиссии
          маркетплейса подгрузятся автоматически.
        </p>
        <Card>
          <Form>
            <Row gutter={20}>
              <Col span={8}>
                <FormItem name="product">
                  <Label label="Товар и его категория:">
                    <Select
                      size="large"
                      className="w-full"
                      defaultValue={products[0].id}
                      onChange={handleChangeProduct}
                      options={products.map((product) => ({
                        label: product.title,
                        value: product.id,
                      }))}
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Коммиссия Родны кут, %">
                    <InputNumber<number>
                      size="large"
                      className="w-full min-w-full disabled:text-black disabled:bg-opacity-100"
                      style={{
                        width: "100%",
                      }}
                      value={rounding(
                        getPercentNumber(
                          forms.productForm.productAndCategory?.percents
                        )
                      )}
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Себестоимость еденицы, р.">
                    <InputNumber<number>
                      defaultValue={0}
                      style={{
                        width: "100%",
                      }}
                      value={rounding(forms.productForm.costPrice)}
                      onChange={(v) => dispatch(setCostPrice(v || 0))}
                      size="large"
                    />
                  </Label>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={6}>
                <FormItem>
                  <Label label="Цена до скидки, р.">
                    <InputNumber<number>
                      defaultValue={0}
                      value={forms.productForm.priceBeforeDiscount}
                      onChange={(v) => dispatch(setPriceBeforeDiscount(v || 0))}
                      size="large"
                      className="w-full min-w-full"
                      style={{
                        width: "100%",
                      }}
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  <Label label="Скидка на площадке, %">
                    <InputNumber<number>
                      value={rounding(
                        getPercentNumber(forms.productForm.discount)
                      )}
                      min={0}
                      max={100}
                      onChange={(v) =>
                        dispatch(setDiscount(getNumberPercent(v)))
                      }
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  <Label label="Цена продажи, р.">
                    <InputNumber<number>
                      defaultValue={1000}
                      size="large"
                      className="w-full min-w-full"
                      style={{
                        width: "100%",
                      }}
                      value={rounding(priceForSell)}
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  <Label label="Комиссия составит:">
                    <InputNumber<number>
                      defaultValue={1000}
                      value={rounding(comission)}
                      size="large"
                      className="w-full min-w-full"
                      style={{
                        width: "100%",
                      }}
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </section>
    </Container>
  );
};

export default ProductAndDiscount;
