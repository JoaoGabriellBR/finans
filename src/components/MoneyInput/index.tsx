/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NumericFormat } from "react-number-format";

interface NumericPriceInputProps {
  value: any;
  onChange: (value: any) => void;
  price: any;
}

const MoneyInput: React.FC<NumericPriceInputProps> = ({
  value,
  onChange,
  price,
}) => {
  const handleValueChange = (values: any) => {
    onChange(values.floatValue);
  };

  return (
    <NumericFormat
      value={value}
      onValueChange={handleValueChange}
      prefix={price && "R$ "}
      thousandSeparator="."
      placeholder="R$ 0,00"
      decimalSeparator=","
      decimalScale={price && 2}
      fixedDecimalScale={price}
    />
  );
};

export default MoneyInput;
