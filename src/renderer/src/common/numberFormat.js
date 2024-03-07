export const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const dateFormat = (date) => {
  const newdate = new Date(date);
  return newdate.toLocaleDateString('ID');
}
export const replaceNumberFormat = (number) => {
  const clearNumber = number.replace(/\D/g, '');
  return clearNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const clearNumberFormat = (number) => {
  const clearNumber = number.replace(/\D/g, '');
  return parseInt(clearNumber);
}