import React from 'react';
import OrderProducts from './OrderProducts';
import OrderUser from './OrderUser';
import axios from 'axios';


function OrderList(props)
{
    const cod=props.obj.Codice_Ordine;
    const role=props.user;

    const deleteHandler = (e) =>{
        if(role === 'true')
        {
            if(window.confirm("Sei sicuro di voler eliminare questo ordine?")){
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
                const del=async () =>{
                    const {data} = await axios.post("/api/users/delete", {cod}, {headers: {Authorization: bearer}});
                    if(data==='token scaduto,login per favore.')
                    {
                        window.alert(data);
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("user");
                        window.location.href="/signin";
                    }     
                } 
                del();
            }
            window.location.reload(false);
        }
        else
        {
            if(window.confirm("Sei sicuro di voler modificare stato di questo ordine?")){
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
                const mod=async () =>{
                    const {data} = await axios.post("/api/admin/modify", {cod}, {headers: {Authorization: bearer}}); 
                    if(data==='token scaduto,login per favore.')
                    {
                        window.alert(data);
                        localStorage.removeItem("adminToken");
                        localStorage.removeItem("admin");
                        window.location.href="/adminsignin";
                    }    
                } 
                mod();
            }
            window.location.reload(false);
        }
    }
      


    return(
        <div className="orderlistdiv">
            <li key={props.obj.Codice_Ordine}>
                <table className="table">
                    <tr>
                        <th>Data Ordine :</th><td>{props.obj.Data_Ordine}</td>
                        <th>Orario :</th><td>{props.obj.Orario}</td>
                        <th>Modalità ritiro :</th><td>{props.obj.Ritiro}</td>
                        <th>Totale Spesa :</th><td>{props.obj.Totale} €</td>
                        <th>Stato Lavorazione :</th><td>{props.obj.Stato} </td>
                        {props.obj.Stato === 'da lavorare' ?
                        (<div><td>{'  '}</td><td><button className="delbtn" onClick={() => deleteHandler()}>{props.btnvalue}</button></td></div>) : null}
                    </tr>
                </table>
                {props.user !== 'true' ? (<OrderUser cod={props.obj.Cod_Utente} />) : null}
                <OrderProducts ord={props.obj.Prodotto} /> 
            </li>
        </div>
    );
}
export default OrderList;