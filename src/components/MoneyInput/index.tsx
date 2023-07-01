import React, { useState, useEffect } from "react";

interface MoneyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {

  const formatCurrency = (value: string) => {
    const number = Number(value) / 100;
    const formattedValue = number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formattedValue;
  };

  const [formattedValue, setFormattedValue] = useState(formatCurrency(value));

  useEffect(() => {
    const rawValue = formattedValue.replace(/[^\d]/g, "");
    onChange(rawValue);
  }, [formattedValue, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const rawValue = inputValue.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(rawValue);
    setFormattedValue(formattedValue);
  };

  return (
    <input
      type="text"
      value={formattedValue}
      onChange={handleChange}
      placeholder="R$ 0,00"
    />
  );
};

export default MoneyInput;

