import axios from 'axios';
import React, { useState } from 'react';
import AdminHeaderScreen from './AdminHeaderScreen';

function AddProductScreen()
{
    const [categoria,setCategoria] = useState('pizza');
    const [nome,setNome] = useState('');
    const [specifica,setSpecifica] = useState('');
    const [prezzo,setPrezzo] = useState('');
    const [msg,setMsg] = useState('');

    const addProductHandler = (e) =>{
        e.preventDefault();
        let bearer = 'Bearer ' + (JSON.parse(localStorage.getItem('adminToken')).token);
        const add=async () =>{
            const {data} = await axios.post("/api/admin/addproduct", 
            {categoria,nome,specifica,prezzo}, {headers: {Authorization: bearer}});
            if(data==='token scaduto,login per favore.')
            {
                window.alert(data);
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                window.location.href="/adminsignin";
            }
            else if(data!=="Prodotto esistente, prova con altro nome.")
            {
                window.alert(data);
                window.location.reload(false);
            }
            else
            {
                setMsg(data);
            }
        } 
        add();
    }

    return(
        <div className="grid-container">
            <AdminHeaderScreen />
            {localStorage.getItem("admin") === null ?
            (<div><p className="parag">Login prima di effettuare le operazioni desiderate.</p></div>) : 
            (<div>
                <div>
                    <form className="form" onSubmit={addProductHandler}>
                        <p className="title">Aggiungi prodotti al menù : {'  '} <span>(Tutti i campi sono obbligatori)</span></p>
                        <p className="title"><span>{msg}</span></p>
                        <div>
                            <label>Categoria Prodotto :</label>
                            <select value={categoria} onChange={e => setCategoria(e.target.value)} required>
                                <option value='pizza'>pizza</option>
                                <option value='frittura'>frittura</option>
                                <option value='dolci'>dolci</option>
                                <option value='bibite'>bibite</option>
                            </select>
                        </div>
                        <div>
                            <label>Nome Prodotto:</label>
                            <input type="text" placeholder="Enter name product"
                            onChange={e => setNome(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Specifica Prodotto:</label>
                            <input type="text" placeholder="Enter specific product"
                            onChange={e => setSpecifica(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Prezzo Prodotto:</label>
                            <input type="text" placeholder="Enter price"
                            onChange={e => setPrezzo(e.target.value)} required></input>
                        </div>
                        <div>
                            <label />
                            <button className="confirm" type="submit">Aggiungi</button>
                        </div>
                    </form>
                </div>
            </div>)}
        </div>
    );
}

export default AddProductScreen;