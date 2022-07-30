import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import { ReactComponent as RefereeShirtSvg } from '../Images/referee-shirt.svg';
import { Button } from './Button';

interface IProps {
  children?: any;
}

export const Nav = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClicked = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav className="dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center">
              <div className="flex flex-row items-center justify-center">
                {/* <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                /> */}
                <RefereeShirtSvg className="h-10 w-10 mr-2" />
                <p className="font-light text-xl dark:text-white">Domarservice</p>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 dark:text-slate-50">
                  <Link className="font-light text-base" to="/">Hem</Link>
                  <Link className="font-light text-base" to="/matcher">Alla matcher</Link>
                  <Link className="font-light text-base" to="/referee/1">Domare 1</Link>
                  <Link className="font-light text-base" to="/referee/2">Domare 2</Link>
                  <Link className="font-light text-base" to="/company/1">Förening 1</Link>
                  <Link className="font-light text-base" to="/minprofil">Min profil</Link>
                  <Link to="/login">
                    <Button filled={false} text="Logga in" />
                  </Link>
                  <Link to="/registrera">
                    <Button filled text="Registrera" />
                  </Link>
                  <ToggleTheme />
                </div>
              </div>
            </div>
            <div className="flex md:hidden absolute top-3 right-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-slate-50 hover:text-white hover:bg-primaryHover focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Öppna menyn</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div hidden={!isOpen}>
          <div className="md:hidden absolute w-full bg-slate-100 border-b-primary border-b-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/">Hem</Link>
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/referee/1">Domare 1</Link>
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/referee/2">Domare 2</Link>
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/company/1">Förening 1</Link>
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/minprofil">Min profil</Link>
              <Link onClick={() => handleLinkClicked()} className="block py-2 ml-4 font-medium text-base" to="/login">
                Logga in
              </Link>              
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="z-0">
        {props.children}
      </div> */}
    </div>
  );
};
