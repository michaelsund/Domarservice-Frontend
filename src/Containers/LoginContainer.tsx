import axios from '../Helpers/Axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Components/Button';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { DomarserviceContextType } from '../Types/DomarserviceContextType';

const LoginContainer = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(DomarserviceContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [email, setEmail] = useState('admin@osund.com');
  const [password, setPassword] = useState('!Oneverycomplexpassword123');
  // @ts-expect-error cannot find typing for from
  const fromUrl = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    setLoading(true);
    setError(false);
    setErrorMsg('');
    axios
      .post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/authenticate/login`,
        {
          username: email,
          password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        setIsLoggedIn(true);
        navigate(fromUrl, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMsg(err.response.data.message);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const token: string | null = localStorage.getItem('token');
  //     if (token !== null) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center text-gray-900 dark:text-white">
      <div className="flex-inital max-w-2xl">
        <label className="relative block">
          <span className="sr-only">Epost</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-primary dark:fill-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            className="my-2 text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-none focus:ring-0 sm:text-sm"
            placeholder="Epost"
            // disabled={loggedIn}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>
        <label className="relative block">
          <span className="sr-only">Lösenord</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-primary dark:fill-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            className="my-2 text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-none focus:ring-0 sm:text-sm"
            placeholder="Lösenord"
            // disabled={loggedIn}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <div className="flex flex-col space-y-2 mt-2 mb-2">
          <Button text="Logga in" shadow onClick={() => handleLogin()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </Button>
          <Button text="Logga ut" shadow onClick={() => handleLogout()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </Button>
          {loading && <LoadingSpinner />}
        </div>
        <div className="flex justify-center">{error && <p>{errorMsg}</p>}</div>
      </div>
    </div>
  );
};

export default LoginContainer;
