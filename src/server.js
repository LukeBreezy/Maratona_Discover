const express = require('express')  //Biblioteca para cria o servidor
const server = express()
const routes = require('./routes')  // Importando routes (rotas)
const path = require('path')

// usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statics
server.use(express.static("public"))    // Usando o a pasta public como diretorio padrão para imagens, estilo e scripts

// usar o req.body
server.use(express.urlencoded({ extended: true }))


// routes
server.use(routes)      // Usando o routes.js para definir as rotas

/*
// request, response
server.get('/', (req, res) => {
    //console.log(__dirname)

    //return res.send('Olá')
    return res.sendFile(__dirname + "/views/index.html")
})
*/

server.listen(3000, () => console.log('rodando'))   // Rodando o servidor escutando a porta 3000
