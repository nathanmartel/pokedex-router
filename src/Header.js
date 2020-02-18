import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {

    return (
    <header>
      <h1 className="hidden">Pokemon</h1>
      <div className="img-container">
        <a href="/"><img src="/pokemon-logo-png-2000.png" alt="Pokemon logo" /></a>
      </div>
      <div className="menu">
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/About">About</Link>
        
      </div>
    </header>
    )
    }
}