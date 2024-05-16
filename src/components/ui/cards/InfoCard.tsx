"use client";
import { FC } from "react";
import { Card } from "antd";

type Props = {
  items: { title: string; value: string }[];
  bgColor: string;
};

const InfoCard: FC<Props> = ({ items, bgColor }) => {
  return (
    <Card className="h-full" style={{ background: bgColor }}>
      <table className="w-full font-semibold text-white text-lg">
        <tbody>
          {items.map((item) => (
            <tr className="flex w-full pb-3">
              <td className="pr-2 w-full">{item.title}</td>
              <td className="flex flex-shrink-0 justify-end w-24">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default InfoCard;
