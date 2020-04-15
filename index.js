
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


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get('/read', function (req, res, next) {

  db('task').then((dados)=>{
    res.send(dados)
  },next)

  return next();
});



server.post('/save',(req, res)=>{
  db('task')
  .insert(req.body)
  .then (dados => {
    return res.send(dados)
  })
    
  })
  

  server.post('/create', function (req, res, next) {

    db('task')
      .insert(req.body)
      .then((dados)=>{
      res.send(dados)
    },next)
  
    return next();
  });
  

  server.get('/show/:id', function (req, res, next) {
    const {id} = req.params
  
    db('task')
      .where('id', id)
      .first()
      .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
  
      res.send(dados)
    },next)
  
    return next();
  });


  server.put('/update/:id', function (req, res, next) {
    const {id} = req.params
  
    db('task')
      .where('id', id)
      .update(req.body)
      .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
        
      res.send('dados atualizados!')
    },next)
  
    return next();
  });

  
    server.del('/delete/:id', function (req, res, next) {
      const {id} = req.params
    
      db('task')
        .where('id', id)
        .delete()
        .then((dados)=>{
          if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
          
        res.send('dados excluidosç!')
      },next)
    
      return next();
    });


    
  server.listen(8081,() => {
    console.log(' Servidor Ok ');
  });

///////////

/*
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


  HTML RESPOSTA 
  <tbody>
  <tr id="retorno">
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="btn td_editar text-info" id="updat"><i class="far fa-edit"></i></td> 
      <td class="btn td_excluir text-danger" id="dele"> <i class="fas fa-trash-alt"></i> </td> 
  </tr>
 </tbody>
*/
 


