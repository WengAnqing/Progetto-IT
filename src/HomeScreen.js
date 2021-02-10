import React from 'react';
import AllProducts from './AllProducts'
import HeaderScreen from './HeaderScreen';

function HomeScreen(){
  return(
    <div className="grid-container">
    <HeaderScreen />
      <div className="home">
        <div className="menu">
          <div className="title">Categorie</div>
          <ul className="categories">
            <li className="cat">
              <a href="#pizze">Pizze</a>
            </li>
            <li className="cat">
              <a href="#fritture">Fritture</a>
            </li>
            <li className="cat">
              <a href="#dolci">Dolci</a>
            </li>
            <li className="cat">
              <a href="#bibite">Bibite</a>
            </li>
          </ul>
        </div>
        <div><p id="pizze" className="type">---------------PIZZE----------------</p><AllProducts url="/api/products/pizze" />
        <p id="fritture" className="type">---------------FRITTURE----------------</p><AllProducts url="/api/products/fritture" />
        <p id="dolci" className="type">---------------DOLCI----------------</p><AllProducts url="/api/products/dolci" />
        <p id="bibite" className="type">---------------BIBITE----------------</p><AllProducts url="/api/products/bibite" />
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;