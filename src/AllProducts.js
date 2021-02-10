import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllProducts(props)
{
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetch=async () =>{
    const {data} = await axios.get(props.url);
    setProduct(data);
    } 
    fetch();
  },[props]) 


  function addOrder(pr) {
    var qty= document.getElementById(pr.Codice_Prodotto).value;
    pr.Qty=Number(qty);
    if(localStorage.getItem("productslist")===null)
    {
      var productsarray=[];
      productsarray.push(pr);
      localStorage.setItem( "productslist" , JSON.stringify(productsarray));
    }
    else
    {
      productsarray = JSON.parse(localStorage.getItem("productslist"));
      var bit=false;
      productsarray.forEach(element => {
        if(element.Codice_Prodotto === pr.Codice_Prodotto)
        {
          element.Qty=element.Qty+pr.Qty;
          bit=true;
        }
      });
      if(!bit)
      {
        productsarray.push(pr);
      }
      localStorage.setItem( "productslist" , JSON.stringify(productsarray));
    }
    window.alert("articolo aggiunto correttamente!");
  }
    
  return(
  <div className="main">
      <ul className="products">
      {
        products.map(product =>
          <li key={product.Codice_Prodotto}>
            <div className="product">
              <div className="left">
                <div className="product-name">{product.Nome}</div>
                <div className="product-specific">{product.Specifica}</div>
              </div>
              <div className="middle">
                <div className="product-price">{product.Prezzo} €</div>
              </div>
              <div className="right">
                <ul>
                  <li>Qty: <select id={product.Codice_Prodotto}>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                    </select>
                  </li>
                  <li><button onClick={() => addOrder(product)} className="add">Add</button></li>
                </ul>
              </div>
            </div>
          </li>
        )
      }   
      </ul>
    </div>
  );
}
export default AllProducts;