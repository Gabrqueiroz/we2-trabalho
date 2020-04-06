var express = require('express'); //Importa a lib express
var app = express();//Inicia a lib
const knex = require('knex')
const path = require('path')

app.get('/all', function(req, res) {
  res.send('Olá mundo');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/dist/index.html")
});

app.listen(8081,() => {
    console.log(' Servidor Ok ');
  });
  