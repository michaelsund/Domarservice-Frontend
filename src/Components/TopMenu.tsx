import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

const TopMenu = () => {
  return (
    <div className="flex py-4 pl-4 space-x-4 bg-primary-500 text-slate-50 sticky top-0 z-50 mb-4">
      <Link to='/'>Home</Link>
      <Link to='/referee'>Referee</Link>
      <Link className="flex-1" to='/login'>Login</Link>
      <ToggleTheme className="w-8" />
    </div>
  );
};

export default TopMenu;
