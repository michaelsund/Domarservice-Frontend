import React, { Component, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@osund.com');
  const [password, setPassword] = useState('!Oneverycomplexpassword123');

  const handleLogin = () => {
    fetch('/authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Auth success');
          console.log(data.data);
          localStorage.setItem('token', data.data.token);
          navigate(-1);
        } else {
          console.log('Auth failed');
        }
      })
      .catch((err) => console.log(err));
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
      <p>The context token is: {localStorage.getItem('token')}</p>
    </div>
  );
};

export default LoginContainer;
