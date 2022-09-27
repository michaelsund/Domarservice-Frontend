export const GetName = () => {
  const fullName = localStorage.getItem('fullName');
  if (fullName && fullName !== 'undefined') {
    return fullName;
  }
  localStorage.removeItem('fullName');
  return '';
};
