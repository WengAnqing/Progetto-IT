import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderScreen from './HeaderScreen';

function CartScreen()
{
    
    const [products, setProduct] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      if(localStorage.getItem("productslist")!==null)
      {
        var productsarray = JSON.parse(localStorage.getItem("productslist"));
        setProduct(productsarray);

        productsarray.forEach(element => {
            setTotal(t => t+Number(element.Prezzo)*(element.Qty))
          });
        }
    },[]) 
    

    function deleteProduct(pr)
    {
        var index = products.indexOf(pr);
        if (index > -1) {
            products.splice(index, 1);
            }
        localStorage.setItem( "productslist" , JSON.stringify(products));
        window.alert("articolo eliminato correttamente!");
        window.location.reload(false);
    }

    const orderHandler = (e) =>{
      var orario= document.getElementById("orario").value;
      var ritiro= document.getElementById("ritiro").value;
      var stato= "da lavorare";
      if(new Date().toLocaleTimeString()>orario)
      {
        window.alert("Attenzione non può scegliere un'orario già passato! ");
      }
      else
      {
        const send=async () =>{
          let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
          const {data} = await axios.post("/api/users/order", {products,total,orario,ritiro,stato}, {headers: {Authorization: bearer}});
          if(data==='token scaduto,login per favore.')
          {
            window.alert(data);
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            window.location.href="/signin";
          }
          else
          {
            localStorage.removeItem("productslist");
            window.alert(data);
            window.location.href="/";
          }
          } 
          send();
      }
      
    }

    return(
      <div className="grid-container">
        <HeaderScreen />  
        <div>
            {
              (localStorage.getItem("productslist")===null || products.length<1) ?
              ( <p className="contact">Non ci sono articoli selezionati.</p> ) :
              ( <div><ul className="products">
              {
                products.map(product =>
                  <li key={product.Codice_Prodotto}>
                    <div className="cart">
                      <div className="l">
                        <div className="product-namec">{product.Nome}</div>
                      </div>
                      <div className="ml">
                        <div className="product-price">Prezzo : {product.Prezzo} €</div>
                      </div>
                      <div className="mr">
                        <div className="product-qty">Qty : {product.Qty} </div>
                      </div>
                      <div className="r">
                        <div className="product-btn"><button onClick={() => deleteProduct(product)} className="delete">Delete</button></div>
                      </div>
                    </div>
                  </li>
                )
              }   
              </ul>
              <div>
                  <p className="parag">-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- </p>
                  <p className="parag">Totale : {total} €</p>
                  {localStorage.getItem("userToken") != null ? 
                  (
                    <ul className="categories"><p className="parag">
                    <li>Scegli un orario:{'  '} 
                      <select id="orario">
                        <option value="18:00:00">18:00</option>
                        <option value="18:30:00">18:30</option>
                        <option value="19:00:00">19:00</option>
                        <option value="19:30:00">19:30</option>
                        <option value="20:00:00">20:00</option>
                        <option value="20:30:00">20:30</option>
                        <option value="21:00:00">21:00</option>
                        <option value="21:30:00">21:30</option>
                        <option value="22:00:00">22:00</option>
                      </select>
                    </li>
                    <br></br>
                    <li>Scegli modalità ritiro:{'  '} 
                      <select id="ritiro">
                      <option value="ritiro in negozio">ritiro in negozio</option>
                      <option value="consegna a domicilio">consegna a domicilio</option>
                      </select>
                    </li></p>
                    <li><p className="parag"><button className="confirm" onClick={() => orderHandler()}>Conferma Ordine</button></p></li>
                  </ul>
                    ):
                  (<p className="parag">Registrarti oppure login per confermare ordine.</p> )}
              </div>
              </div>
              )
            }
        </div>
      </div>
    );
}
export default CartScreen;