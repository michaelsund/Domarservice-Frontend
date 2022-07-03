import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

const TopMenu = () => {
  return (
    <div className="flex my-4 space-x-4 text-gray-900 dark:text-white">
      <Link to='/'>Home</Link>
      <Link to='/referee'>Referee</Link>
      <Link to='/login'>Login</Link>
      <ToggleTheme />
    </div>
  );
};

export default TopMenu;
