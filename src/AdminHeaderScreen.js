import React from 'react';
import {  Link } from 'react-router-dom'



function AdminHeaderScreen()
{
    return (
      <header className="header">
          <div className="home">
            <Link className="link" to="/">PizzaAlVolo</Link>
          </div>
          <div className="links">
            <Link className="link" to="/addproduct">Aggiungi Prodotto</Link>
            <Link className="link" to="/addadmin">Aggiungi Amministartori</Link>
            <Link className="link" to="/manageorder">Gestisci Ordini</Link>
            <Link className="link" to="/adminsignin">SignIn/LogOut</Link>
          </div>
      </header>
  );
}

export default AdminHeaderScreen;
