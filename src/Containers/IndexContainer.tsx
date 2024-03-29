import React, { useContext } from 'react';
import { Button } from '../Components/Button';
import { Hero } from '../Components/Hero';
import { ReactComponent as WhistleSvg } from '../Images/whistle.svg';
import { ReactComponent as ClockSvg } from '../Images/clock.svg';
import { ReactComponent as MoneySvg } from '../Images/money.svg';
import { ReactComponent as RefereeSvg } from '../Images/referee.svg';
import { ReactComponent as SecureSvg } from '../Images/secure.svg';
import { UpcomingMatches } from '../Components/UpcomingMatches';
import { Link } from 'react-router-dom';
import Company1 from '../Images/company1.jpg';
import Referee1 from '../Images/referee1.jpg';
import { Sponsors } from '../Components/Sponsors';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { Role } from '../Types/Role';

const IndexContainer = () => {
  const { isLoggedIn, role }: any = useContext(DomarserviceContext);

  return (
    <div className="flex flex-col text-gray-900 dark:text-white">
      <Hero className="flex content-center items-center bg-hero-pattern bg-no-repeat bg-auto bg-center">
        <div className="grid w-full grid-cols-1 gap-4 place-items-center">
          <h5 className="uppercase mb-2 text-5xl font-bold tracking-tight text-slate-50 dark:text-white">
            Hitta domare till nästa match!
          </h5>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-50 dark:text-white">
            Domarservice underlättar för föreningar och deras process vid matcher.
          </h5>
          <div className="flex flex-row space-x-2">
            {!isLoggedIn && (
              <Link to="/registrera">
                <Button text="Registrera" secondary />
              </Link>
            )}
            {(role === Role.RefereeUser || role === Role.Admin) && (
              <Link to="/matcher">
                <Button text="Alla matcher" secondary />
              </Link>
            )}
            {(role === Role.CompanyUser || role === Role.Admin) && (
              <Link to="/domare">
                <Button text="Alla domare" secondary />
              </Link>
            )}
          </div>
        </div>
      </Hero>
      <div className="container mx-auto w-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-5 mt-12 p-0">
          <div className="flex flex-col p-10 content-center items-center text-center bg-slate-50 text-black">
            <MoneySvg className="h-10 w-10 mb-4" />
            <h1 className="text-xl mb-2">Gratis</h1>
            <p className="text-xs">Domarservice är helt gratis att använda.</p>
          </div>
          <div className="flex flex-col p-10 content-center items-center text-center bg-black text-slate-50">
            <ClockSvg className="h-10 w-10 mb-4 fill-white" />
            <h1 className="text-xl mb-2">Hitta domare snabbt</h1>
            <p className="text-xs">
              Med domarservice hittar du domare till nästa match med rekordfart!
            </p>
          </div>
          <div className="flex flex-col p-10 content-center items-center text-center bg-slate-50 text-black">
            <RefereeSvg className="h-10 w-10 mb-4" />
            <h1 className="text-xl mb-2">Lokala domare</h1>
            <p className="text-xs">Dina lokala domare på ett och samma ställe.</p>
          </div>
          <div className="flex flex-col p-10 content-center items-center text-center bg-black text-slate-50">
            <WhistleSvg className="h-10 w-10 mb-4 fill-white" />
            <h1 className="text-xl mb-2">Otroligt enkelt</h1>
            <p className="text-xs">
              Du behöver bara lägga ut en match här på sidan så kommer domare att ta kontakt med
              dig.
            </p>
          </div>
          <div className="flex flex-col p-10 content-center items-center text-center bg-slate-50 text-black">
            <SecureSvg className="h-10 w-10 mb-4" />
            <h1 className="text-xl mb-2">Säker användning</h1>
            <p className="text-xs">Domarservice har hög integritet och följer alltid GDPR.</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-24 text-center w-full">
        <h1 className="text-4xl mb-14 font-bold tracking-tight uppercase">Kommande matcher</h1>
        <UpcomingMatches />
        <div className="w-full my-20 flex justify-center">
          <Link to="/matcher">
            <Button shadow text="Se alla matcher" />
          </Link>
        </div>
      </div>
      <div className="container w-full mx-auto my-24 text-center">
        <h1 className="text-4xl mb-14 font-bold tracking-tight uppercase">Sponsorer</h1>
        <Sponsors />
      </div>
      {!isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center items-center p-8">
              <h1 className="text-white drop-shadow-2xl text-4xl mb-4 font-bold tracking-tight uppercase">
                Registrera dig som domare
              </h1>
              <h4 className="text-white drop-shadow-2xl mb-8 text-xl font-normal tracking-tight">
                Hitta matcher att döma
              </h4>
              <Link to="/registrera">
                <Button text="Registrera" secondary />
              </Link>
            </div>
            <img className="object-cover h-80 w-full brightness-50" src={Referee1} alt="" />
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center items-center p-8">
              <h1 className="text-white drop-shadow-2xl text-4xl mb-4 font-bold tracking-tight uppercase">
                Registrera din förening
              </h1>
              <h4 className="text-white drop-shadow-2xl mb-8 text-xl font-normal tracking-tight">
                Hitta domare till föreningens matcher
              </h4>
              <Link to="/registrera">
                <Button text="Registrera" secondary />
              </Link>
            </div>
            <img className="object-cover h-80 w-full brightness-50" src={Company1} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexContainer;
