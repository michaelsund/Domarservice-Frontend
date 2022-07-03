import axios from '../Helpers/Axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '../Components/IconButton';

const LoginContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@osund.com');
  const [password, setPassword] = useState('!Oneverycomplexpassword123');
  // @ts-expect-error cannot find typing for from
  const fromUrl = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    axios
      .post(
        '/authenticate/login',
        {
          username: email,
          password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        navigate(fromUrl, { replace: true });
        // navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <span>Username</span>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <br />
      <span>Password</span>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <div className='flex flex-col'>
        <IconButton text="Login" onClick={() => handleLogin()} />
        {/* <button
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => handleLogin()}
        >
          <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
              />
            </svg>
          </span>
          Sign in
        </button>
        <button
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => handleLogout()}
        >
          <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </span>
          Sign out
        </button> */}
      </div>
      <p>The context token is: {localStorage.getItem('token')}</p>
    </div>
  );
};

export default LoginContainer;
