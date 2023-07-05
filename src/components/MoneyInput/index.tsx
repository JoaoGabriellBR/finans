/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NumericFormat } from "react-number-format";

interface NumericPriceInputProps {
  value: any;
  onChange: (value: any) => void;
  price: any;
  color: string;
}

const MoneyInput: React.FC<NumericPriceInputProps> = ({
  value,
  onChange,
  price,
  color,
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
      style={{
        color,
        fontSize: "1.5rem",
        width: "100%",
        height: "30px",
        border: "none",
        outline: 0,
      }}
    />
  );
};

export default MoneyInput;
