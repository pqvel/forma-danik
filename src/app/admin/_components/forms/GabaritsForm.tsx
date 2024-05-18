"use client";
import { FC, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  Tag,
} from "antd";
import { Gabarit } from "@prisma/client";
import { changeGabarits } from "@/app/actions/gabarits";
import { getNumberPercent, getPercentNumber } from "@/tools/percentValue";
import { rounding } from "@/tools/math";
changeGabarits;
type Props = {
  initialGabarits: Gabarit[];
};

const GabaritsForm: FC<Props> = ({ initialGabarits = [] }) => {
  const [isEdited, setEdited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [gabarits, setGabarits] = useState<Gabarit[]>(initialGabarits);

  const onSave = async () => {
    setLoading(true);
    await changeGabarits(gabarits).then(() => {
      setEdited(false);
      setLoading(false);
    });
  };

  const addGabarite = () => {
    setEdited(true);
    setGabarits([
      ...gabarits,
      {
        id: Math.random(),
        title: "",
        percentageForDelivery: 0,
        warehouseStorage: 0,
        length: "",
        height: "",
        weight: "",
      },
    ]);
    setEdited(true);
  };

  const deleteGabarit = (id: number) => {
    setEdited(true);
    setGabarits((gabarits) => gabarits.filter((g) => g.id !== id));
  };

  const changeGabaritTitle = (id: number, value: string) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) => (g.id === id ? { ...g, title: value } : g))
    );
  };

  const changeGabaritPercentageForDeliveryPercent = (
    id: number,
    value: number
  ) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) =>
        g.id === id ? { ...g, percentageForDelivery: value } : g
      )
    );
  };

  const changeGabaritWarehouseStorage = (id: number, value: number) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) => (g.id === id ? { ...g, warehouseStorage: value } : g))
    );
  };

  const changeGabaritLength = (id: number, value: string) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) => (g.id === id ? { ...g, length: value } : g))
    );
  };

  const changeGabaritHeight = (id: number, value: string) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) => (g.id === id ? { ...g, height: value } : g))
    );
  };

  const changeGabaritWeight = (id: number, value: string) => {
    setEdited(true);
    setGabarits((gabarits) =>
      gabarits.map((g) => (g.id === id ? { ...g, weight: value } : g))
    );
  };

  return (
    <Card>
      <Form>
        <table className=" w-full">
          <thead className="flex bg-slate-200 w-full font-semibold rounded-t-lg">
            <tr className="flex space-x-4 w-full px-4 py-2">
              <td className=" w-full text-start">Размер</td>
              <td className=" w-1/3 text-start">Доставка %</td>
              <td className=" w-1/3 text-start">Хранение на складе</td>
              <td className="flex w-[98px] min-w-[98px] text-start">
                Действия
              </td>
            </tr>
          </thead>
          <tbody className="flex flex-col w-full border border-gray-300">
            {gabarits.map((gabarit) => (
              <GabaritItem
                key={gabarit.id}
                gabarit={gabarit}
                onDelete={() => deleteGabarit(gabarit.id)}
                onChangeTitle={(value) => changeGabaritTitle(gabarit.id, value)}
                onChangePercentageForDelivery={(value) =>
                  changeGabaritPercentageForDeliveryPercent(gabarit.id, value)
                }
                onChangeWarehouseStorage={(value) =>
                  changeGabaritWarehouseStorage(gabarit.id, value)
                }
                onChangeHeight={(value) =>
                  changeGabaritHeight(gabarit.id, value)
                }
                onChangeLength={(value) =>
                  changeGabaritLength(gabarit.id, value)
                }
                onChangeWeight={(value) =>
                  changeGabaritWeight(gabarit.id, value)
                }
              />
            ))}
          </tbody>
          <tfoot className="flex bg-slate-200">
            <tr className="flex items-center justify-center w-full py-2 px-2 space-x-4">
              <td>
                <Button onClick={addGabarite} disabled={loading}>
                  Добавить
                </Button>
              </td>
              <td>
                <Button onClick={onSave} disabled={loading || !isEdited}>
                  {loading ? "Загрузка..." : "Сохранить"}
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </Form>
    </Card>
  );
};

export default GabaritsForm;

type GabaritItemProps = {
  gabarit: Gabarit;
  onDelete: () => void;
  onChangeTitle: (value: string) => void;
  onChangePercentageForDelivery: (value: number) => void;
  onChangeWarehouseStorage: (value: number) => void;
  onChangeLength: (value: string) => void;
  onChangeHeight: (value: string) => void;
  onChangeWeight: (value: string) => void;
};

const GabaritItem: FC<GabaritItemProps> = ({
  gabarit: {
    title,
    percentageForDelivery,
    warehouseStorage,
    length,
    height,
    weight,
  },
  onDelete,
  onChangeTitle,
  onChangePercentageForDelivery,
  onChangeWarehouseStorage,
  onChangeLength,
  onChangeHeight,
  onChangeWeight,
}) => {
  return (
    <tr className="even:bg-blue-100">
      <td className="flex w-full">
        <table className="flex flex-col space-y-2 w-full  px-4 py-2">
          <tr className="flex space-x-4 w-full">
            <td className="w-full">
              <Input
                style={{ width: "100%" }}
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            </td>
            <td className=" w-1/3">
              <InputNumber
                style={{ width: "100%" }}
                value={rounding(getPercentNumber(percentageForDelivery))}
                onChange={(value) =>
                  onChangePercentageForDelivery(getNumberPercent(value || 0))
                }
              />
            </td>
            <td className=" w-1/3">
              <InputNumber
                style={{ width: "100%" }}
                value={warehouseStorage}
                onChange={(value) => onChangeWarehouseStorage(value || 0)}
              />
            </td>
            <td className=" flex justify-end w-[98px]">
              <Button className="w-24" type="primary" danger onClick={onDelete}>
                Удалить
              </Button>
            </td>
          </tr>
          <tr className="flex space-x-4 w-full">
            <td className=" flex-shrink-0">Длина, Ширина, Высота</td>
            <td className="flex w-1/3">
              <Input
                style={{ width: "100%" }}
                value={length}
                onChange={(e) => onChangeLength(e.target.value)}
                placeholder="Длина"
              />
            </td>
            <td className="flex w-1/3">
              <Input
                style={{ width: "100%" }}
                value={weight}
                onChange={(e) => onChangeWeight(e.target.value)}
                placeholder="Ширина"
              />
            </td>
            <td className="flex w-1/3">
              <Input
                style={{ width: "100%" }}
                value={height}
                onChange={(e) => onChangeHeight(e.target.value)}
                placeholder="Высота"
              />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  );
};
