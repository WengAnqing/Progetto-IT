import axios from 'axios';
import React, { useEffect, useState } from 'react';


function ProfileScreen()
{
    const [user,setUser] = useState({});
    var [pswd,setPassword] = useState('');
    var [password,setCurrentPassword] = useState('');
    var [ind,setIndirizzo] = useState('');
    var [tel,setTelefono] = useState('');
    
    useEffect(() => {
        const fetch=async () =>{
            let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
            const {data} = await axios.get("/api/users/getuser", {headers: {Authorization: bearer}});
            if(data==='token scaduto,login per favore.')
            {
                window.alert(data);
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                window.location.href="/signin";
            }
            else
            {
                localStorage.setItem( "user" , JSON.stringify(data));
                setUser(data[0]);
            }
        }
        fetch();
    },[])

    const email=user.Email;
    const indirizzo=user.Indirizzo;
    const telefono=user.Telefono;

    const saveChange = (e) =>{
        e.preventDefault();
        
        if(pswd==='' && ind==='' && tel==='')
        {
            window.alert("compila almeno un campo per poter salvare le modifiche !" );
        }
        else if(password==='')
        {
            window.alert("Inserisci per favore il password corrente !" );
        }
        else
        {
            const get=async () =>{
                const {data} = await axios.post("/api/users/signin", {email,password});
                if(data==="Mail inesistente" || data==="Password sbagliato")
                {
                    window.alert(data + "! Controlla i dati inseriti. ");    
                }
                else{
                    if(pswd===''){pswd=password;}
                    if(ind===''){ind=indirizzo;}
                    if(tel===''){tel=telefono;}
                    const upd=async () =>{
                        let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('userToken')).token);
                        const {data} = await axios.post("/api/users/update", {pswd,ind,tel}, {headers: {Authorization: bearer}});
                        if(data==='token scaduto,login per favore.')
                        {
                            window.alert(data);
                            localStorage.removeItem("userToken");
                            localStorage.removeItem("user");
                            window.location.href="/signin";
                        }
                        else
                        {
                            window.alert(data);
                            window.location.reload(false);
                        }
                    }
                    upd();
                }
            }
            get();
        }
    }

    return(
        <div>
            <form  onSubmit={saveChange}>
                <p className="red">Il mio profilo: </p>
                <p>Cognome : {user.Cognome} </p>
                <p>Nome : {user.Nome}</p>
                <p>Email : {user.Email}</p>
                <p>Password : <input type="password" 
                onChange={e => setPassword(e.target.value)}></input></p>
                <p>Indirizzo : <input type="text" placeholder={user.Indirizzo} 
                onChange={e => setIndirizzo(e.target.value)}></input></p>
                <p>Telefono : <input type="text" placeholder={user.Telefono} 
                onChange={e => setTelefono(e.target.value)}></input></p>
                <p className="alert">Per salvare modifiche bisogna inserire password currente : </p> 
                <p>Password Corrente : <input type="password" onChange={e => setCurrentPassword(e.target.value)}></input></p>
                <button className="confirm" type="submit">Salva Modifiche</button>
            </form>
        </div>
    );
}

export default ProfileScreen;