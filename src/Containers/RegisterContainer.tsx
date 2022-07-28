import axios from '../Helpers/Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Components/Button';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Card } from '../Components/Card';
import { ProgressBar } from '../Components/ProgressBar';

const RegisterContainer = () => {
  const navigate = useNavigate();
  const steps = 5;
  const [percentDone, setPercentDone] = useState<number>((1 / steps) * 100);
  const [step, setStep] = useState<number>(1);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isReferee, setIsReferee] = useState<boolean>(true);
  const [surname, setSurname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVerified, setPasswordVerified] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

  const handleRegister = () => {
    setLoading(true);
    setError(false);
    setErrorMsg('');
    axios
      .post(
        `${process.env.NODE_ENV === 'production' && '/api'}/authenticate/login`,
        {
          username: email,
          password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMsg(err.response.data.message);
        setLoading(false);
      });
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
  // }, [])
  useEffect(() => {
    setPercentDone((step / steps) * 100);
    console.log(`In step ${step}`);
    console.log(`Percent done ${percentDone}`);
    // Skip company information if signing up as referee.
    if (step === 4 && isReferee) {
      setStep(step + 1);
      setPercentDone((step / steps) * 100);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <ProgressBar percent={percentDone} />
        {step === 1 && (
          <Card className="flex flex-col items-center px-8 pt-6 pb-8 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            <p className="p-4 text-xl tracking-tight">Vad vill du registrera dig som?</p>
            <div className="flex space-x-2">
              <Button
                text="Domare"
                shadow
                onClick={() => {
                  setIsReferee(true);
                  setStep(step + 1);
                }}
              />
              <Button
                text="Förening"
                shadow
                onClick={() => {
                  setIsReferee(false);
                  setStep(step + 1);
                }}
              />
            </div>
          </Card>
        )}
        {step === 2 && (
          <Card className="flex flex-col items-center px-8 pt-6 pb-8 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Förnamn</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Förnamn"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Efternamn</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Efternamn"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Epost</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Epost"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button text="Tillbaka" shadow onClick={() => setStep(step - 1)} />
              <Button text="Nästa" shadow onClick={() => setStep(step + 1)} />
            </div>
          </Card>
        )}
        {step === 3 && (
          <Card className="flex flex-col items-center px-8 pt-6 pb-8 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Lösenord</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bekräfta lösenord
              </label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Bekräfta lösenord"
                value={passwordVerified}
                onChange={(e) => setPasswordVerified(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button text="Tillbaka" shadow onClick={() => setStep(step - 1)} />
              <Button text="Nästa" shadow onClick={() => setStep(step + 1)} />
            </div>
          </Card>
        )}
        {step === 4 && (
          <Card className="flex flex-col items-center px-8 pt-6 pb-8 mb-4">
            {!isReferee && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Föreningens namn
                </label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Föreningens namn"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  type="text"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button text="Tillbaka" shadow onClick={() => setStep(step - 1)} />
              <Button text="Nästa" shadow onClick={() => setStep(step + 1)} />
            </div>
          </Card>
        )}
        {step === 5 && (
          <Card className="flex flex-col items-center px-8 pt-6 pb-8 mb-4">
            <p className="p-4 text-xl tracking-tight">Klart!</p>
            <p>
              Ett mail har skickats till epost-adressen du angav. Du behöver verifiera din epost
              innan du kan fortsätta att logga in.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegisterContainer;
