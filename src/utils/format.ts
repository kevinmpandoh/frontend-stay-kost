// Helper untuk format angka ke IDR
export const formatCurrency = (value: string | number) => {
  const number = typeof value === "string" ? parseInt(value) : value;
  if (isNaN(number)) return "";
  return number.toLocaleString("id-ID");
};
