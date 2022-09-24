export const GetId = () => {
  const id = localStorage.getItem('id');
  if (id && id !== 'undefined') {
    return parseInt(id);
  }
  localStorage.removeItem('id');
  return undefined;
};
