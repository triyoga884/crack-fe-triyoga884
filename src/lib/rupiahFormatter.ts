export const rupiahFormat = (price: number) => {
  const result = new Intl.NumberFormat('en-ID', {
    maximumSignificantDigits: 8,
    style: 'currency',
    currency: 'IDR',
  }).format(price);
  return result;
};
