import axios from '../Helpers/Axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  };

  return (
    <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
      <span>Username</span>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <br />
      <span>Password</span>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <button onClick={() => handleLogin()}>Login</button>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>The context token is: {localStorage.getItem('token')}</p>
    </div>
  );
};

export default LoginContainer;
