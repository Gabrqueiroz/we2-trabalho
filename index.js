
const express = require('express'); //Importa a lib express
const app = express();//Inicia a lib
const bodyParser= require('body-parser')
const knex = require('knex')
const path = require('path')
const restify = require('restify');
const errs = require('restify-errors');



const db = knex({
  client: 'mysql',
  connection: { 
  host:"127.0.0.1",
  user: "root",
  password: "",
  database: "db"},
  
})

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.get('/', restify.plugins.serveStatic({
  directory: './dist',
  file: 'index.html'

}));

server.get('/read', function (req, res, next) {

  db('rest').then((dados)=>{
    res.send(dados)
  },next)

  return next();
});

///////////
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
const restify = require('restify');
const errs = require('restify-errors');


const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());



server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'db'
    }
});

server.get('/', restify.plugins.serveStatic({
  directory: './dist',
  file: 'index.html'

}));
/////////////////////////////
server.get('/read', function (req, res, next) {

  knex('rest').then((dados)=>{
    res.send(dados)
  },next)

  return next();
});

server.post('/create', function (req, res, next) {

  knex('rest')
    .insert(req.body)
    .then((dados)=>{
    res.send(dados)
  },next)

  return next();
});

server.get('/show/:id', function (req, res, next) {
  const{id} = req.params

  knex('rest')
    .where('id', id)
    .first()
    .then((dados)=>{
      if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
    res.send(dados)
  }, next)
  return next();
});

server.put('/update/:id', function (req, res, next) {
const{id} = req.params

  knex('rest')
    .update(req.body)
    .where('id',id)
    .then((dados)=>{
      if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
    res.send("atualizado com sucesso")
  },next)

  return next();
});

server.del('/delete/:id', function (req, res, next) {
  const{id} = req.params
  
    knex('rest')
      .delete()
      .where('id',id)
      .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
      res.send("deletado com sucesso")
    },next)
  
    return next();
  });
*/