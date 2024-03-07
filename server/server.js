const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

const DataBase = require("./database/database");

const db = new DataBase();

app.post('/v1/createUser' , (req , res)=>{
 db.insert(req.body)
 .then(response =>{
    res.status(200).send(response);
 })
 .catch(err =>{
    res.status(500).send(err);
 });
 })


app.get('/v1/getData' , (req , res)=>{
    db.getUsers()
    .then(response =>{
        res.status(200).send({
            users: response});
    })
    .catch(err =>{
        res.status(500).send(err);
    })
});

app.get('/v1/getUser' , (req , res)=>{
  
 db.getUserById(req.query.id ,req.query.name)
 .then(response => {
    !response ? res.status(403).send("user not found") : res.send(response);
 })
 .catch(err => {
  res.status(500).send(err);
 });
});

app.put('/v1/updateUser' , (req , res) =>{
   console.log(req.query.id );
   console.log(req.query );
     db.updateUser(req.query.id ,req.query)
     .then(response => {
        res.send(response);
     })
     .then(err => {
       res.status(500).send(err);
     });
});

app.delete('/v1/deleteUser' , (req , res) =>{
  db.deleteUser(req.query.id)
  .then(response => {
    res.send(response);
 })
 .then(err => {
   res.status(500).send(err);
 });
});

let port = 3000;
app.listen(port , ()=>{
 console.log(`server starten in the port ${port}...`);
 db.conecte();
});
