import React, { Component, useState, useContext } from 'react'
import { AuthContext, AuthContextType } from '../Context/AuthContext'

const LoginContainer = () => {
  const [email, setEmail] = useState('admin@osund.com')
  const [password, setPassword] = useState('!Oneverycomplexpassword123')
  // const { token, setToken } = useContext(AuthContext) as AuthContextType;

  const handleLogin = () => {
    // fetch('/authenticate/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: email,
    //     password
    //   })
    // })
    //   .then((response) => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       console.log('Auth success');
    //       console.log(data.data.token);
    //       setToken(data.data.token)
    //     } else {
    //       console.log('Auth failed');
    //     }
    //   })
    //   .catch(err => console.log(err));
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
          console.log('Auth success')
          console.log(data.data)
          // setToken(data.data.token);
          localStorage.setItem('token', data.data.token)
          
        } else {
          console.log('Auth failed')
        }
      })
      .catch((err) => console.log(err))
  }

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
  )
}

export default LoginContainer
