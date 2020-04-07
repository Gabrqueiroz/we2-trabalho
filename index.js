
const express = require('express'); //Importa a lib express
const app = express();//Inicia a lib
const bodyParser= require('body-parser')
const knex = require('knex')
const path = require('path')

const db = knex({
  client: 'mysql',
  connection: { 
  host:"127.0.0.1",
  user: "root",
  password: "",
  database: "db"},
  
})




app.get('/', function (req, res, next) {
  res.sendFile(__dirname + "/dist/index.html")
  });

app.listen(8081,() => {
    console.log(' Servidor Ok ');
  });
  
/*
  //var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();*/