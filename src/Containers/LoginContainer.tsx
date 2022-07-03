import axios from '../Helpers/Axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Components/Button';
import { LoadingSpinner } from '../Components/LoadingSpinner';

const LoginContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('admin@osund.com');
  const [password, setPassword] = useState('!Oneverycomplexpassword123');
  // @ts-expect-error cannot find typing for from
  const fromUrl = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
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
      <div className='flex flex-col space-y-2 mt-2 mb-2'>
        <Button text='Login' disabled={loading} onClick={() => handleLogin()}>
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
        </Button>
        <Button text='Logout' disabled={loading} onClick={() => handleLogout()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
        </Button>
        {loading && <LoadingSpinner />}
      </div>
      <p>The context token is: {localStorage.getItem('token')}</p>
    </div>
  );
};

export default LoginContainer;
