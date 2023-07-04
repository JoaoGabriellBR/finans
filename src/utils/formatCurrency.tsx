export const formatCurrency = (value: string) => {
  const number = Number(value.replace(/[^\d]/g, "")) / 100;
  const formattedValue = number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formattedValue;
};
