export const AddLeadingZeroLessThatTenAsString = (input: number): string => {
  if (input < 10 && input > 0) {
    return `0${input}`;
  }
  return `${input}`;
};