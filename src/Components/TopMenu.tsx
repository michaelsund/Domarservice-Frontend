import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

const TopMenu = () => {
  return (
    <div className="flex py-4 pl-4 space-x-4 bg-none text-primary dark:text-slate-50 sticky top-0 z-56">
      <Link to='/'>Hem</Link>
      <Link to='/referee'>Testdomare</Link>
      <Link className="flex-1" to='/login'>Logga in</Link>
      <ToggleTheme className="w-12" />
      {/* <GetUserName className="w-12" /> */}
    </div>
  );
};

export default TopMenu;
