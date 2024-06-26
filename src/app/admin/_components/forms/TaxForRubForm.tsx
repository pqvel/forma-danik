"use client";
import { FC, useState } from "react";
import { Button, Card, Form, InputNumber } from "antd";
import { setTaxForRub } from "@/app/actions/taxForRub";
import { Label } from "@/components/ui/form";
import FormItem from "antd/es/form/FormItem";

type Props = {
  defaultValue: number;
};

const TaxForRubForm: FC<Props> = ({ defaultValue }) => {
  const [isEdited, setEdited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dValue, setDValue] = useState<number>(defaultValue);
  const [value, setValue] = useState<string | number>(dValue * 100);

  const onChange = (value: number | null) => {
    setValue(value ? value : 0);
    setEdited(true);
  };

  const onSubmit = async (value: number) => {
    setLoading(true);
    await setTaxForRub(value / 100)
      .then((data) => {
        setDValue(data.percents);
        setValue(data.percents * 100);
      })
      .finally(() => {
        setLoading(false);
        setEdited(false);
      });
  };

  const disgardChanges = () => {
    setEdited(false);
    setValue(dValue * 100);
  };
  return (
    <Card style={{ marginBottom: 16 }}>
      <Form>
        <FormItem>
          <Label label="Налог на единицу продукта, %">
            <InputNumber<number>
              value={+value}
              onChange={onChange}
              size="large"
              className="w-full min-w-full"
              style={{
                width: "100%",
              }}
            />
          </Label>
        </FormItem>
        <div>
          <Button
            className="mr-3"
            disabled={loading || !isEdited}
            onClick={() => onSubmit(+value)}
          >
            {loading ? "Загрузка..." : "Сохранить"}
          </Button>

          {isEdited && (
            <Button disabled={loading} onClick={disgardChanges}>
              Отмена
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default TaxForRubForm;
