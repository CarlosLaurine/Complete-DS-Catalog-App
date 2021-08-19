export const formatPrice = (price: number) => {

  const parameters = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return new Intl.NumberFormat('pt-br', parameters).format(price);
  
};
