import React, { useEffect, useState } from 'react';


function OrderProducts(props)
{

    const [products, setProduct] = useState([]);
    useEffect(() => {
        
        setProduct(JSON.parse(props.ord));
        
      },[props]) 

    return(
        <div>
            <ul className="right">                      
                { products.map(product =>
                <li key={product.Codice_Prodotto}>
                    <table className="table1">
                        <tr>
                            <th>Nome Prodotto :</th><td>{product.Nome}</td>
                            <th>Quantità Ordinata :</th><td>{product.Qty}</td>
                        </tr>
                    </table>
                </li> )}                       
            </ul>
        </div>
    );
}
export default OrderProducts;