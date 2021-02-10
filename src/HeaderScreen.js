import React from 'react';
import {  Link } from 'react-router-dom'



function HeaderScreen()
{
    return (
      <header className="header">
          <div className="home">
            <Link className="link" to="/">PizzaAlVolo</Link>
          </div>
          <div className="links">
            <Link className="link" to="/cart">Carrello</Link>
            <Link className="link" to="/myorder">Miei-Ordini</Link>
            <Link className="link" to="/signin">SignIn/Profilo</Link>
            <Link className="link" to="/adminsignin">Admin</Link>
            <Link className="link" to="/contact">Contatti</Link>
          </div>
      </header>
  );
}

export default HeaderScreen;
