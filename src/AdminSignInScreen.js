import axios from 'axios';
import React, { useState } from 'react';
import AdminHeaderScreen from './AdminHeaderScreen';

function AdminSignInScreen()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');

    const signinHandler = (e) =>{
        e.preventDefault();
        
        const get=async () =>{
        const {data} = await axios.post("/api/admin/signin", {email,password});
        if(data==="Mail inesistente" || data==="Password sbagliato")
        {
            setMsg(data + "! Controlla i dati inseriti. ");
            
        }
        else
        {
            localStorage.setItem( "adminToken" , JSON.stringify(data[1]));
            localStorage.setItem( "admin" , JSON.stringify(data));
            window.location.reload(false);
        }
        } 
        get();
    }

    return(
        <div className="grid-container">
            <AdminHeaderScreen />
            <div>
                {localStorage.getItem("admin") === null ?
                (<div>
                    <form className="form" onSubmit={signinHandler}>
                        <div>
                            <h1>Sign In</h1>
                        </div>
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
                            <button className="confirm" type="submit">Sign In</button>
                        </div>
                    </form>
                    <div><p className="contact">{msg}</p></div>
                </div>):
                (<div><p className="contact">Login con successo ora può effettuare le operazioni desiderate.</p>
                    <p className="contact">
                    <button className="confirm" onClick={() => {localStorage.removeItem("admin"); window.location.href="/";}}>Log Out</button>
                </p></div>)}
            </div>
        </div>
    );
}
export default AdminSignInScreen;