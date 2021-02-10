import React, { useEffect, useState } from 'react';
import axios from 'axios';


function OrderUser(props)
{

    const [user, setUser] = useState({});
    const cod=props.cod;

    useEffect(() => {
        let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
        const getuser=async () =>{
            const {data} = await axios.post("/api/admin/getuser", {cod}, {headers: {Authorization: bearer}});
            if(data==='token scaduto,login per favore.')
            {
                window.alert(data);
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                window.location.href="/adminsignin";
            }
            else
            {
                setUser(data[0]);
            } 
        } 
        getuser();
        
    },[cod])  

    return(
        <div>
            <table className="table">
                <tr>
                    <th><b>DATI CLIENTE :</b></th>
                    <th>Cognome :</th><td>{user.Cognome}</td>
                    <th>Nome :</th><td>{user.Nome}</td>
                    <th>Indirizzo :</th><td>{user.Indirizzo} </td>
                    <th>Telefono :</th><td>{user.Telefono} </td>
                </tr>
            </table>
        </div>
    );
}
export default OrderUser;