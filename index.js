const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

// ~~~~~~~~~~~~~~~~ config ~~~~~~~~~~~~~~~~
//Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main', 
runtimeOptions: { allowProtoPropertiesByDefault: true, 
allowProtoMethodsByDefault: true, } }))

app.set('view engine', 'handlebars')




//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas
//primeira pagina
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/index.html")
});

//rota home
app.get('/home', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('home', { posts: posts })
    })
    
})
// rota do formulario
app.get('/cad', function (req, res) {
    res.render('formulario')
});

// rota de mensagem de poste 
app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/home')
    }).catch(function (erro) {
        res.send("Houve um erro : " + erro)
    })
})
 //rota deletar

 app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso !")
    }).catch(function(erro){
        res.send("Esta postagem não existe !")
    })
 })





//tem que ser o ultimo codigo
app.listen(8081, function () {
    console.log("servidor rodando na url http://localhost:8081 ");
});