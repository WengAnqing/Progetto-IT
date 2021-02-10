import axios from 'axios';
import React, { useState } from 'react';
import AdminHeaderScreen from './AdminHeaderScreen';

function AddAdminScreen()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');

    const registerHandler = (e) =>{
        e.preventDefault();
        let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
        const reg=async () =>{
        const {data} = await axios.post("/api/admin/add", {email,password}, {headers: {Authorization: bearer}});
        if(data==='token scaduto,login per favore.')
        {
            window.alert(data);
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
            window.location.href="/adminsignin";
        }
        else if(data!=="Email esistente, prova con altro mail.")
        {
            window.alert(data);
            window.location.href="/adminsignin";
        }
        else
        {
            setMsg(data);
        }
        } 
        reg();
    }

    return(
        <div className="grid-container">
            <AdminHeaderScreen />
            {localStorage.getItem("admin") !== null ?
            (<div>
                <div>
                    <form className="form" onSubmit={registerHandler}>
                        <p className="title">Inserisci credenziali per nuovo amministratore :</p>
                        <p className="title"><span>{msg}</span></p>
        
                        <div>
                            <label>Email :</label>
                            <input type="email" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Password :</label>
                            <input type="password" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)} required></input>
                        </div>
                        <div>
                            <label />
                            <button className="confirm" type="submit">Aggiungi</button>
                        </div>
                    </form>
                </div>
            </div>) : (<div><p className="parag">Login prima di effettuare le operazioni desiderate.</p></div>)}
        </div>
    );
}

export default AddAdminScreen;