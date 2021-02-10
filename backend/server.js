const express = require("express");
const mysql = require('mysql');
var utils =require('./utils.js');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const jwt= require( "jsonwebtoken" );
require('dotenv').config();

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(5000,() => { console.log("server started at http://localhost:5000") });

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pizzaalvolo',
        dateStrings: true,
    }
);
connection.connect();



/***** RESTful API *****/


/*****     PRODUCTS     *****/


server.get('/api/products/pizze',(req,res)=>{
    let sql = 'SELECT * FROM prodotti WHERE Categoria = "pizza" ';
    connection.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});


server.get('/api/products/fritture',(req,res)=>{
    let sql = 'SELECT * FROM prodotti WHERE Categoria = "frittura" ';
    connection.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});


server.get('/api/products/bibite',(req,res)=>{
    let sql = 'SELECT * FROM prodotti WHERE Categoria = "bibite" ';
    connection.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});


server.get('/api/products/dolci',(req,res)=>{
    let sql = "SELECT * FROM prodotti WHERE Categoria = 'dolci' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});


/*****     USERS     *****/


server.post("/api/users/signin", (req,res)=>{
    
    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM utenti WHERE Email = '"+ email +"' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            bcrypt.compare(password,result[0].Password,function(err, response) {
                if(err) console.log(err);
                if (response)
                {
                    result.push({"token": utils.generateToken(result[0])});
                    res.send(result);
                }
                else
                {
                    res.send("Password sbagliato")
                }
            });
            
        }
        else{
            res.send("Mail inesistente");
        }
        
    });
});


server.post("/api/users/register", (req,res)=>{
    
    let cognome = req.body.cognome;
    let nome = req.body.nome;
    let email = req.body.email;
    let password = req.body.password;
    let indirizzo = req.body.indirizzo;
    let telefono = req.body.telefono;

    let sql = "SELECT * FROM utenti WHERE Email='"+ email +"' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send("Email esistente, prova con altro mail.");
        }
        else{
            bcrypt.hash(password, 8, function(err, hash) {
                if(err) console.log(err);
        
                let sql = "INSERT INTO utenti VALUES(null, '"+ cognome +"' , '"+ nome +"' , '"+ email +"' , '"+ hash +"' , '"+ indirizzo +"' , '"+ telefono +"')  ";
                connection.query(sql, (err) => {
                    if(err) throw err;
                    res.send("Utente registrato correttamente! effettua login per accedere.");
                });
            });
        }

    });
});


server.post("/api/users/order", utils.verifyToken, order);
function order(req,res) {
    
    let id = req.user.Codice_Utente;
    let products = JSON.stringify(req.body.products);
    let total = req.body.total;
    let orario = req.body.orario;
    let ritiro = req.body.ritiro;
    let stato = req.body.stato;

    let sql = "INSERT INTO ordini VALUES(null, '"+ id +"' , CURDATE() , '"+ products +"' , '"+ total +"' , '"+ orario +"', '"+ ritiro +"' , '"+ stato +"' )  ";
    connection.query(sql, (err) => {
        if(err) throw err;
        res.send("Ordine effettuato con successo!");
    });
}


server.get("/api/users/getorder", utils.verifyToken, (req,res)=>{
    
    let id = req.user.Codice_Utente;
    let sql = "SELECT * FROM ordini WHERE Cod_Utente= "+ id +" ORDER BY Data_Ordine DESC,Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini effettuati.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.get("/api/users/gettodayorder", utils.verifyToken, (req,res)=>{
    
    let id = req.user.Codice_Utente;
    
    let sql = "SELECT * FROM ordini WHERE Cod_Utente= "+ id +" AND Data_Ordine = CURDATE() ORDER BY Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini di data odierna.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.get("/api/users/getuser", utils.verifyToken, (req,res)=>{
    
    let codice =  req.user.Codice_Utente;
    
    let sql = "SELECT * FROM utenti WHERE Codice_Utente= "+ codice +" ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini effettuati.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.get("/api/users/getpreorder", utils.verifyToken, (req,res)=>{
    
    let id =  req.user.Codice_Utente;
    
    let sql = "SELECT * FROM ordini WHERE Cod_Utente= "+ id +" AND Data_Ordine != CURDATE() ORDER BY Data_Ordine DESC,Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini di date precedenti.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.post("/api/users/delete", utils.verifyToken, (req,res)=>{
    
    let cod = req.body.cod;
    
    let sql = "DELETE FROM ordini WHERE Codice_Ordine= "+ cod +" ";
    connection.query(sql, (err) => {
        if(err) throw err;
    });
});


server.post("/api/users/update", utils.verifyToken, (req,res)=>{
    
    let codice =  req.user.Codice_Utente;
    let password = req.body.pswd;
    let indirizzo = req.body.ind;
    let telefono = req.body.tel;

    bcrypt.hash(password, 8, function(err, hash) {
        if(err) console.log(err);
        let sql = " UPDATE utenti set Password='"+ hash +"' , Indirizzo='"+ indirizzo +"' , Telefono='"+ telefono +"' WHERE Codice_Utente= "+ codice +" ";
        connection.query(sql, (err) => {
            if(err) throw err;
            res.send("Dati aggiornati con successo.");
        });
    });
});


/*****     ADMIN     *****/


server.post("/api/admin/add", utils.verifyToken, (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM admin WHERE Email='"+ email +"' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send("Email esistente, prova con altro mail.");
        }
        else{
            bcrypt.hash(password, 8, function(err, hash) {
                if(err) console.log(err);
        
                let sql = " INSERT INTO admin VALUES( '"+ email +"' , '"+ hash +"' ) ";
                connection.query(sql, (err) => {
                    if(err) throw err;
                    res.send(" Amministratore aggiunto correttamente! ");
                });
            });
        }

    });
});


server.post("/api/admin/signin", (req,res)=>{
    
    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM admin WHERE Email = '"+ email +"' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            bcrypt.compare(password,result[0].Password,function(err, response) {
                if(err) console.log(err);
                if (response)
                {
                    result.push({"token": utils.generateToken(result[0])});
                    res.send(JSON.stringify(result));
                }
                else
                {
                    res.send("Password sbagliato")
                }
            });
            
        }
        else{
            res.send("Mail inesistente");
        }
        
    });
});


server.get("/api/admin/getorder", utils.verifyToken, (req,res)=>{
    
    let sql = "SELECT * FROM ordini ORDER BY Data_Ordine DESC,Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini effettuati.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.get("/api/admin/gettodayorder", utils.verifyToken, (req,res)=>{
    
    let sql = "SELECT * FROM ordini WHERE Data_Ordine = CURDATE() ORDER BY Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini con data odierna.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.get("/api/admin/getpreorder", utils.verifyToken, (req,res)=>{
    
    let sql = "SELECT * FROM ordini WHERE Data_Ordine != CURDATE() ORDER BY Data_Ordine DESC,Orario";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length === 0){
            res.send("Al momento non ci sono ordini con date precedenti.");
        }
        else
        {
            res.send(result);
        }
    });
});


server.post("/api/admin/getuser", utils.verifyToken, (req,res)=>{
    
    let cod = req.body.cod;
    
    let sql = "SELECT * FROM utenti WHERE Codice_Utente= "+ cod +" ";

    connection.query(sql, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});


server.post("/api/admin/modify", utils.verifyToken, (req,res)=>{
    
    let cod = req.body.cod;
    
    let sql = "UPDATE ordini set Stato='lavorazione finita' WHERE Codice_Ordine= "+ cod +" ";
    connection.query(sql, (err) => {
        if(err) throw err;
    });
});


server.post("/api/admin/addproduct", utils.verifyToken, (req,res)=>{
    
    let categoria = req.body.categoria;
    let nome = req.body.nome;
    let specifica = req.body.specifica;
    let prezzo = req.body.prezzo;

    let sql = "SELECT * FROM prodotti WHERE Nome='"+ nome +"' ";
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0)
        {
            res.send("Prodotto esistente, prova con altro nome.");
        }
        else
        {
            let sql = "INSERT INTO prodotti VALUES(null, '"+ categoria +"' , '"+ nome +"' , '"+ specifica +"' , '"+ prezzo +"' )  ";
            connection.query(sql, (err) => {
                if(err) throw err;
                res.send("Prodotto aggiunto correttamente! ");
            });
        }
    });
});