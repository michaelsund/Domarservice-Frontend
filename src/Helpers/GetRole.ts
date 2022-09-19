import { Role } from '../Types/Role';

export const GetRole = () => {
  // fetch(`${process.env.NODE_ENV === 'production' ? '/api' : ''}/authenticate/get-role`, {
  //   headers: new Headers({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log(response);
  //     return response.data as Role;
  //   })
  //   .catch((e: any) => {
  //     console.log(e);
  //     return null;
  //   });
  const role = localStorage.getItem('role');
  if (role && role !== 'undefined') {
    return role as Role;
  }
  localStorage.removeItem('role');
  return null;
};
