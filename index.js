
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

app.set('view engine', 'html')
exports.index = function(req, res){
  res.render('index');
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false}))

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + "/dist/index.html")
  });

app.get('/all',(req, res)=>{
  db('task')
 .then (dados =>{
   res.send(dados)
   
 })
  })

app.post('/save',(req, res)=>{
db('task')
.insert(req.body)
.then (dados => {
  return res.send(dados)
})
  
})

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