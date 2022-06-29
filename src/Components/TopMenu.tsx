import React, { Component } from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div>
      <Link to="/">Home</Link>{' | '}
      <Link to="/referee">Referee</Link>{' | '}
      <Link to="/login">Login</Link>
    </div>
  );
}

export default TopMenu;