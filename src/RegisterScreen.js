import axios from 'axios';
import React, { useState } from 'react';
import HeaderScreen from './HeaderScreen';

function RegisterScreen()
{
    const [cognome,setCognome] = useState('');
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [indirizzo,setIndirizzo] = useState('');
    const [telefono,setTelefono] = useState('');
    const [msg,setMsg] = useState('');

    const registerHandler = (e) =>{
        e.preventDefault();
        
        const reg=async () =>{
        const {data} = await axios.post("/api/users/register", 
        {cognome,nome,email,password,indirizzo,telefono});
        if(data!=="Email esistente, prova con altro mail.")
        {
            window.alert(data);
            window.location.href="/signin";
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
            <HeaderScreen />
            <div>
                <div>
                    <form className="form" onSubmit={registerHandler}>
                        <p className="title">Registrarti : {'  '} <span>(Tutti i campi sono obbligatori)</span></p>
                        <p className="title"><span>{msg}</span></p>
                        <div>
                            <label>Cognome :</label>
                            <input type="text" placeholder="Enter firstname"
                            onChange={e => setCognome(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Nome :</label>
                            <input type="text" placeholder="Enter lastname"
                            onChange={e => setNome(e.target.value)} required></input>
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
                            <label>Indirizzo :</label>
                            <input type="text" placeholder="Enter address"
                            onChange={e => setIndirizzo(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Telefono :</label>
                            <input type="text" placeholder="Enter telephone number"
                            onChange={e => setTelefono(e.target.value)} required></input>
                        </div>
                        <div>
                            <label />
                            <button className="confirm" type="submit">Registrarti</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;