export const formatCurrency = (value: string) => {
  const numericValue = parseInt(value.replace(/\D/g, ""));

  const formattedValue = numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};


