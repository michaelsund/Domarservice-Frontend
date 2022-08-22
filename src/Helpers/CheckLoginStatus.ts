export const CheckLoginStatus = () => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined') {
    return true;
  }
  localStorage.removeItem('token');
  return false;
}