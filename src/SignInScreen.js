import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import HeaderScreen from './HeaderScreen';
import ProfileScreen from './ProfileScreen';

function SignInScreen()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');

    const signinHandler = (e) =>{
        e.preventDefault();
        
        const get=async () =>{
        const {data} = await axios.post("/api/users/signin", {email,password});
        if(data==="Mail inesistente" || data==="Password sbagliato")
        {
            setMsg(data + "! Controlla i dati inseriti. ");
            
        }
        else
        {
            localStorage.setItem( "userToken" , JSON.stringify(data[1]));
            localStorage.setItem( "user" , JSON.stringify(data));
            window.alert("Login con successo!");
            window.location.reload(false);
        }
        } 
        get();
    }

    return(
        <div className="grid-container">
            <HeaderScreen />
            <div>
                {localStorage.getItem("user") === null ?
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
                        <div>
                            <label />
                            <div>
                                Nuovo cliente? {'  '}
                                <Link className="link" to="/register">Crea tuo account</Link>
                            </div>
                        </div>
                    </form>
                    <div><p className="contact">{msg}</p></div>
                </div>):
                (<div className="profile">
                    <ProfileScreen />
                    <p><button className="confirm" onClick={() => 
                        {localStorage.removeItem("user");localStorage.removeItem("userToken"); window.location.href="/";}}>
                        Log Out</button></p>
                </div>)}
            </div>
        </div>
    );
}
export default SignInScreen;
