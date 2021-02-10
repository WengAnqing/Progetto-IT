import React, { useEffect, useState } from 'react';
import OrderList from './OrderList';
import axios from 'axios';
import HeaderScreen from './HeaderScreen';


function MyOrderScreen()
{

    const [msg, setMsg] = useState('');
    const [orders, setOrder] = useState([]);
    const [opt, setOpt] = useState('today');

    useEffect(() => {
        if( localStorage.getItem("user") !== null )
        {
            const getorder=async () =>{
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
                const {data} = await axios.get("/api/users/getorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user");
                    window.location.href="/signin";
                }
                else if(data==="Al momento non ci sono ordini effettuati.")
                {
                    setMsg(data); 
                }
                else
                {
                    setOrder(data);
                }

            } 
            getorder();
        }
    },[]) 

    function optHandler(){
        if(opt==='today')
        {
            const getorder=async () =>{
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
                const {data} = await axios.get("/api/users/gettodayorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user");
                    window.location.href="/signin";
                }
                else if(data==="Al momento non ci sono ordini di data odierna.")
                {
                    setMsg(data);
                    setOrder([]);
                }
                else
                {
                    setOrder(data);
                    setMsg('');
                }

            } 
            getorder();
        }
        else
        {
            const getorder=async () =>{
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
                const {data} = await axios.get("/api/users/getpreorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user");
                    window.location.href="/signin";
                }
                else if(data==="Al momento non ci sono ordini di date precedenti.")
                {
                    setMsg(data);
                    setOrder([]);
                }
                else
                {
                    setOrder(data);
                    setMsg('');
                }

            } 
            getorder();
        }
    }

    return(
        <div className="grid-container">
            <HeaderScreen />
                {
                    localStorage.getItem("userToken") === null ?
                    (<div><p className="parag">Effettuare login per consultare i suoi ordini</p></div>) :
    
                    (<div>
                        <p className="opt"><label>Opzione Ordine :{'   '}</label>
                        <select value={opt} onChange={e => setOpt(e.target.value)} >
                            <option value='today'>ordini di oggi</option>
                            <option value='pre'>ordini precedenti</option>
                        </select>{'   '}
                        <button className="delbtn" onClick={() => optHandler()}>Conferma</button>
                        </p>
                        <ul>
                        {
                            orders.map(order =>
                            <OrderList obj= {order} user='true' btnvalue='Elimina Ordine' />
                            )
                        }   
                        </ul>
                        <p className="parag">{msg}</p>
                    </div>) 
                }               
        </div>
    );
}
export default MyOrderScreen;