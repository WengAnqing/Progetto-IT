import React, { useEffect, useState } from 'react';
import OrderList from './OrderList';
import axios from 'axios';
import AdminHeaderScreen from './AdminHeaderScreen';


function ManageOrderScreen()
{

    const [msg, setMsg] = useState('');
    const [orders, setOrder] = useState([]);
    const [opt, setOpt] = useState('today');

    useEffect(() => {
        if( localStorage.getItem("adminToken") !== null )
        {
            const getorder=async () =>{
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
                const {data} = await axios.get("/api/admin/getorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("admin");
                    window.location.href="/adminsignin";
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
            let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
            const getorder=async () =>{
                const {data} = await axios.get("/api/admin/gettodayorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("admin");
                    window.location.href="/adminsignin";
                }
                else if(data==="Al momento non ci sono ordini con data odierna.")
                {
                    setMsg(data);
                    setOrder([]);
                }
                else
                {
                    setMsg('');
                    setOrder(data);
                }

            } 
            getorder();
        }
        else
        {
            const getorder=async () =>{
                let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
                const {data} = await axios.get("/api/admin/getpreorder", {headers: {Authorization: bearer}});
                if(data==='token scaduto,login per favore.')
                {
                    window.alert(data);
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("admin");
                    window.location.href="/adminsignin";
                }
                else if(data==="Al momento non ci sono ordini con date precedenti.")
                {
                    setMsg(data);
                    setOrder([]);
                }
                else
                {
                    setMsg('');
                    setOrder(data);
                }

            } 
            getorder();
        }
    }

    return(
        <div className="grid-container">
            <AdminHeaderScreen />
            {
                localStorage.getItem("admin") === null ?
                (<div><p className="parag">Login prima di effettuare le operazioni desiderate.</p></div>) :

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
                        <OrderList obj= {order} user='false' btnvalue='Lavorazione finita' />
                        )
                    }   
                    </ul>
                    <p className="parag">{msg}</p>
                </div>)
            }
        </div>       
    );
}
export default ManageOrderScreen;