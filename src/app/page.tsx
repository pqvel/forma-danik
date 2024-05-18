"use client";
import { Row, InputNumber, Col } from "antd";
import { Container } from "@/components/ui/wrappers";
import { InfoCard } from "@/components/ui/cards";
import MarketPlace from "@/components/sections/MarketPlace";
import ProductAndDiscount from "@/components/sections/ProductAndDiscount";
import { useEffect, useState } from "react";
import { getAllData } from "./actions/getAllData";
import {
  AdvertisingForRub,
  Gabarit,
  ProductAndCategory,
  TaxForRub,
} from "@prisma/client";
import { useAppSelector } from "@/redux/hooks";
import {
  selectComission,
  selectDeliveryWithDemesion,
  selectPriceForSell,
  selectStorageSixteenDays,
} from "@/redux/slices/formsSlice";
import { rounding } from "@/tools/math";

interface Data {
  taxForRub: TaxForRub;
  advertisingForRub: AdvertisingForRub;
  productAndCategory: ProductAndCategory[];
  gabarits: Gabarit[];
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  // const forms = useAppSelector((state) => state.forms);
  const comission = useAppSelector(selectComission) as number;
  const starage = useAppSelector(selectStorageSixteenDays) as number;
  const deliveryWithDemension = useAppSelector(
    selectDeliveryWithDemesion
  ) as number;
  const priceForSell = useAppSelector(selectPriceForSell) as number;
  const forms = useAppSelector((state) => state.forms);
  const revenue =
    priceForSell -
      comission -
      deliveryWithDemension -
      60 * (forms.marketForm.gabarit?.warehouseStorage || 0) || 0;

  const pureProfit =
    revenue -
      forms.productForm.costPrice -
      priceForSell * (data?.taxForRub.percents || 0) || 0;

  const [isShowAll, setShowAll] = useState<boolean>(false);
  const [ostatok, setOstatok] = useState<number>(0);

  const changeOtatok = (value: number | null) => {
    if (value && value > 0) {
      setOstatok(value);
    } else {
      setOstatok;
    }
  };
  useEffect(() => {
    (async () => {
      const res = ((await getAllData()) as Data) || null;
      console.log(res);
      setData(res);
    })();
  }, []);

  return (
    <>
      <ProductAndDiscount
        products={[
          { id: Math.random(), title: "Не выбрано", percents: 0 },
          ...(data?.productAndCategory || []),
        ]}
      />
      <MarketPlace
        gabarits={[
          {
            id: Math.random(),
            title: "Не выбрано",
            percentageForDelivery: 0,
            warehouseStorage: 0,
            length: "",
            height: "",
            weight: "",
          },

          ...(data?.gabarits || []),
        ]}
        taxForRub={rounding(data?.taxForRub.percents || 0)}
        adverstingForRub={rounding(data?.advertisingForRub.percents || 0)}
      />
      <Container size="large">
        <Row className=" mt-32" gutter={[12, 12]}>
          <Col xs={24} lg={8}>
            <InfoCard
              bgColor="#FF4D83"
              items={[
                {
                  title: "Комиссия маркетплейса",
                  value: `${rounding(comission)} руб`,
                },
                {
                  title: "Хранение и логистика",
                  value: `${rounding(starage + deliveryWithDemension)} руб`,
                },
                {
                  title: "Налоги + реклама",
                  value: `${rounding(
                    priceForSell * (data?.taxForRub.percents || 0) +
                      priceForSell * (data?.advertisingForRub.percents || 0)
                  )} руб`,
                },
              ]}
            />
          </Col>

          <Col xs={24} lg={8}>
            <InfoCard
              bgColor="#4690FF"
              items={[
                {
                  title: "Выручка от реализации единицы товара",
                  value: `${rounding(revenue)} руб`,
                },
                {
                  title: "Чистая прибыль с единицы товара",
                  value: `${rounding(pureProfit)} руб`,
                },
              ]}
            />
          </Col>

          <Col xs={24} lg={8}>
            <InfoCard
              bgColor="#31A927"
              items={[
                {
                  title: "Маржинальность",
                  value: `${rounding(
                    Number.isNaN((pureProfit / priceForSell) * 100)
                      ? 0
                      : (pureProfit / priceForSell) * 100
                  )} %`,
                },
                {
                  title: "Рентабельность вложений",
                  value: `${rounding(
                    Number.isNaN(
                      (pureProfit / forms.productForm.costPrice) * 100
                    )
                      ? 0
                      : (pureProfit / forms.productForm.costPrice) * 100
                  )} %`,
                },
                {
                  title: "Рентабельность продаж",
                  value: `${rounding(
                    Number.isNaN((revenue / forms.productForm.costPrice) * 100)
                      ? 0
                      : (revenue / forms.productForm.costPrice) * 100
                  )} %`,
                },
              ]}
            />
          </Col>
        </Row>

        <div className="flex flex-col items-center justify-center mt-16  mb-8">
          <button
            className=" bg-[#009669] text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 mb-3 text-xl"
            type="button"
            onClick={() => setShowAll(true)}
          >
            Рассчитать показатели для всей партии
          </button>
          {isShowAll && (
            <>
              <div className=" text-[#4B4B4B] text-2xl font-semibold max-w-md text-center mb-2">
                Введите остаток товаров на складе или планируемое количество
              </div>
              <InputNumber
                min={0}
                style={{ maxWidth: 320, width: "100%" }}
                onChange={changeOtatok}
                value={ostatok}
              />
            </>
          )}
        </div>
      </Container>
      {isShowAll && (
        <Container size="small">
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <InfoCard
                bgColor="#CF3D69"
                items={[
                  {
                    title: "Себестоимость партии, р.",
                    value: `${rounding(
                      forms.productForm.costPrice * ostatok
                    )} руб`,
                  },
                  {
                    title: "Комиссия маркетплейса",
                    value: `${rounding(comission * ostatok)} руб`,
                  },
                  {
                    title: "Хранение и логистика",
                    value: `${rounding(
                      (starage + deliveryWithDemension) * ostatok
                    )} руб`,
                  },
                  {
                    title: "Налоги + реклама",
                    value: `${rounding(
                      (priceForSell * (data?.taxForRub.percents || 0) +
                        priceForSell *
                          (data?.advertisingForRub.percents || 0)) *
                        ostatok
                    )} руб`,
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <InfoCard
                bgColor="#3772C9"
                items={[
                  {
                    title: "Выручка от реализации всей партии",
                    value: `${rounding(revenue * ostatok)} руб`,
                  },
                  {
                    title: "Чистая прибыль со всей партии",
                    value: `${rounding(pureProfit * ostatok)} руб`,
                  },
                ]}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
