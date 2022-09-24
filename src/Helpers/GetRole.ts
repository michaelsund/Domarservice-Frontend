import { Role } from '../Types/Role';

export const GetRole = () => {
  const role = localStorage.getItem('role');
  if (role && role !== 'undefined') {
    return role as Role;
  }
  localStorage.removeItem('role');
  return null;
};
