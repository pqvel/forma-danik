"use client";
import { FC } from "react";
import { Card, Form, Row, Select, InputNumber, Input, Col } from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import { Label } from "@/components/ui/form";
import { Container } from "@/components/ui/wrappers";
import { Gabarit } from "@prisma/client";
import {
  selectDeliveryToPVZ,
  setGabarit,
  setRedemptionPercentage,
  selectDeliveryWithDemesion,
  selectStorageSixteenDays,
  selectPriceForSell,
} from "@/redux/slices/formsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { rounding } from "@/tools/math";
import { getNumberPercent, getPercentNumber } from "@/tools/percentValue";

type Props = {
  gabarits: Gabarit[];
  taxForRub: number;
  adverstingForRub: number;
};

const MarketPlace: FC<Props> = ({ gabarits, taxForRub, adverstingForRub }) => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.forms);
  const deliveruToPVZ = useAppSelector(selectDeliveryToPVZ) as number;
  const deliveryWithDEmension = useAppSelector(
    selectDeliveryWithDemesion
  ) as number;
  const warehouseStorage = useAppSelector(selectStorageSixteenDays) as number;
  const priceForSell = useAppSelector(selectPriceForSell) as number;

  const handleChangeGabarit = (id: number) => {
    const g = gabarits.find((gabarit) => gabarit.id === id);
    if (g) dispatch(setGabarit(g));
  };

  const changeDemension = (value: number) => {
    dispatch(setRedemptionPercentage(value));
  };

  return (
    <Container>
      <section className="">
        <Title className="" color="#464646" level={2}>
          Работа с маркетплейсом
        </Title>
        <p className="mb-3 max-w-4xl text-gray-600">
          Укажите габариты товара и процент выкупа - фактический или
          планируемый.
        </p>
        <Card>
          <Form>
            <Row gutter={20}>
              <Col span={9}>
                <FormItem name="product">
                  <Label label="Габариты товара, см (д*ш*в)">
                    <Select
                      size="large"
                      className="w-full"
                      defaultValue={gabarits[0].id}
                      onChange={handleChangeGabarit}
                      options={gabarits.map((gabarit) => ({
                        label: gabarit.title,
                        value: gabarit.id,
                      }))}
                    />
                  </Label>
                </FormItem>
              </Col>
              {forms.marketForm.gabarit && (
                <>
                  <Col span={5}>
                    <FormItem>
                      <Label label="Ширина">
                        <Input
                          disabled
                          value={forms.marketForm.gabarit.weight}
                        />
                      </Label>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem>
                      <Label label="Высота">
                        <Input
                          disabled
                          value={forms.marketForm.gabarit.height}
                        />
                      </Label>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem>
                      <Label label="Длинна">
                        <Input
                          disabled
                          value={forms.marketForm.gabarit.length}
                        />
                      </Label>
                    </FormItem>
                  </Col>
                </>
              )}
            </Row>
            <Row gutter={20}>
              <Col span={8}>
                <FormItem>
                  <Label label="Доставка до ПВЗ, руб">
                    <InputNumber<number>
                      size="large"
                      className="w-full min-w-full"
                      value={rounding(deliveruToPVZ || 0)}
                      style={{
                        width: "100%",
                      }}
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Процент выкупа, %">
                    <InputNumber<number>
                      min={0}
                      value={rounding(
                        getNumberPercent(forms.marketForm.redemptionPercentage)
                      )}
                      max={100}
                      onChange={(v) =>
                        changeDemension(getPercentNumber(v || 0))
                      }
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Доставка с учётом выкупа, р.">
                    <InputNumber<number>
                      size="large"
                      value={rounding(deliveryWithDEmension || 0)}
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
            <Row gutter={20}>
              <Col span={8}>
                <FormItem>
                  <Label label="За хранение на складе 60дн., руб">
                    <InputNumber<number>
                      size="large"
                      value={rounding(warehouseStorage || 0)}
                      className="w-full min-w-full"
                      style={{
                        width: "100%",
                      }}
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Реклама на ед., руб">
                    <InputNumber<number>
                      value={rounding(priceForSell * adverstingForRub || 0)}
                      style={{
                        width: "100%",
                      }}
                      size="large"
                      disabled
                    />
                  </Label>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  <Label label="Налог на ед., руб">
                    <InputNumber<number>
                      size="large"
                      className="w-full min-w-full"
                      style={{
                        width: "100%",
                      }}
                      value={rounding(priceForSell * taxForRub || 0)}
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

export default MarketPlace;
