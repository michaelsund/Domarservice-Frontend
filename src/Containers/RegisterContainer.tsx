import axios from '../Helpers/Axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Components/Button';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Card } from '../Components/Card';
import { ProgressBar } from '../Components/ProgressBar';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { RegisterModel } from '../Types/RegisterModel';
import { Pill } from '../Components/Pill';
import { CountyType } from '../Types/CountyType';

const RegisterContainer = () => {
  const errorsRef: any = useRef();
  const { isLoggedIn }: any = useContext(DomarserviceContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [errorMsgList, setErrorMsgList] = useState<string[]>();
  const [registerInfo, setRegisterInfo] = useState<RegisterModel>({
    surname: 'test1',
    lastname: 'testsson',
    email: 'test@osund.com',
    password: '!Oneverycomplexpassword123',
    passwordConfirmation: '!Oneverycomplexpassword123',
    information: 'Just a note by me!',
    registerAsReferee: true,
    companyName: '',
    companyCity: '',
    companyCounty: Object.keys(CountyType).indexOf('Stockholm'),
  });

  const ScrollTo = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendRegistration = () => {
    setLoading(true);
    setError(false);
    setErrorMsg('');
    axios
      .post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/authenticate/register`,
        registerInfo,
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        setLoading(false);
        setError(false);
        setErrorMsg('');
        setErrorMsgList([]);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMsg(err.response.data.message);
        if (err.response.data.data) {
          setErrorMsgList(err.response.data.data.map((x: any) => x.errorMessage));
        } else {
          setErrorMsgList([]);
        }
        setLoading(false);
        ScrollTo(errorsRef);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoggedIn ? (
        <h1 className="p-4 text-xl tracking-tight">
          Du är redan inloggad, logga ut först för att registrera dig igen.
        </h1>
      ) : (
        <div className="w-full max-w-lg">
          <Card className="flex flex-col px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-col w-full items-center">
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
              <h1 className="mb-8 text-xl tracking-tight">Registrering</h1>
            </div>
            <div className="flex space-x-2 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Förnamn</label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Förnamn"
                  value={registerInfo.surname}
                  onChange={(e) => setRegisterInfo({ ...registerInfo, surname: e.target.value })}
                  type="text"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Efternamn</label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Efternamn"
                  value={registerInfo.lastname}
                  onChange={(e) => setRegisterInfo({ ...registerInfo, lastname: e.target.value })}
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Epost</label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Epost"
                  value={registerInfo.email}
                  onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                  type="email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Lösenord</label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Lösenord"
                  value={registerInfo.password}
                  onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                  type="password"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bekräfta lösenord
                </label>
                <input
                  className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                  placeholder="Bekräfta lösenord"
                  value={registerInfo.passwordConfirmation}
                  onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, passwordConfirmation: e.target.value })
                  }
                  type="password"
                />
              </div>
              <div className="my-6">
                <label className="block text-gray-700 text-sm font-bold">
                  Jag vill registrera mig som
                </label>
                <div>
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    checked={registerInfo.registerAsReferee}
                    onChange={() => setRegisterInfo({ ...registerInfo, registerAsReferee: true })}
                  />
                  <label className="form-check-label inline-block text-gray-800">Domare</label>
                </div>
                <div>
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    checked={!registerInfo.registerAsReferee}
                    onChange={() => setRegisterInfo({ ...registerInfo, registerAsReferee: false })}
                  />
                  <label className="form-check-label inline-block text-gray-800">Förening</label>
                </div>
              </div>
              {!registerInfo.registerAsReferee && (
                <>
                  <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Föreningens namn
                    </label>
                    <input
                      className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                      placeholder="Föreningens namn"
                      value={registerInfo.companyName}
                      onChange={(e) =>
                        setRegisterInfo({ ...registerInfo, companyName: e.target.value })
                      }
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Stad</label>
                    <input
                      className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                      placeholder="Stad"
                      value={registerInfo.companyCity}
                      onChange={(e) =>
                        setRegisterInfo({ ...registerInfo, companyCity: e.target.value })
                      }
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Län</label>
                    <select
                      className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                      placeholder="Välj län"
                      value={registerInfo.companyCounty}
                      onChange={(e) =>
                        setRegisterInfo({ ...registerInfo, companyCounty: +e.target.value })
                      }
                    >
                      {Object.values(CountyType).map((value: string, i: number) => (
                        <option key={i} value={Object.keys(CountyType).indexOf(value)}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                text="Klar"
                fullWidth
                shadow
                onClick={() => {
                  handleSendRegistration();
                }}
              />
            </div>
            {error && <p className="pt-8 text-sm">{errorMsg}</p>}
          </Card>
        </div>
      )}
      <div ref={errorsRef} className="w-full max-w-lg">
        {error &&
          errorMsgList?.map((validationError: string) => (
            <Pill key={validationError}>{validationError}</Pill>
          ))}
      </div>
    </div>
  );
};

export default RegisterContainer;
