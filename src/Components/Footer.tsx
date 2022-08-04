import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { ReactComponent as RefereeShirtSvg } from '../Images/referee-shirt.svg';

export const Footer = () => {
  const { isLoggedIn } = useContext(DomarserviceContext);

  return (
    <>
      <div className="flex flex-col md:flex-row p-8 lg:py-20 lg:px-36 dark:text-slate-50">
        <div className="basis-1/2">
          <div>
            <RefereeShirtSvg className="h-8 w-8 mb-4" />
          </div>
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <p className="text-sm">kontakt@domarservice.se</p>
          </div>
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p className="text-sm">070-3852539</p>
          </div>
        </div>
        <div className="basis-1/2 mt-8 md:mt-0">
          <div className="flex flex-col md:flex-row">
            <div className="basis-1/3">
              <h4 className="drop-shadow-2xl text-lg font-semibold tracking-tight">Om oss</h4>
              <ul className="text-sm">
                <li>
                  <Link to="/">Om oss</Link>
                </li>
                <li>
                  <Link to="/">Sponsorer</Link>
                </li>
                <li>
                  <Link to="/">Kontakt</Link>
                </li>
              </ul>
            </div>
            <div className="basis-1/3">
              <h4 className="drop-shadow-2xl text-lg font-semibold tracking-tight">Domare</h4>
              <ul className="text-sm">
                <li>
                  <Link to="/matcher">Tillgängliga matcher</Link>
                </li>
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link to="/registrera">Registrering</Link>
                    </li>
                    <li>
                      <Link to="/login">Logga in</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="basis-1/3">
              <h4 className="drop-shadow-2xl text-lg font-semibold tracking-tight">Förening</h4>
              <ul className="text-sm">
                <li>
                  <Link to="/">Hitta domare</Link>
                </li>
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link to="/registrera">Registrering</Link>
                    </li>
                    <li>
                      <Link to="/login">Logga in</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
