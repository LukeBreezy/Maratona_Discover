const express = require('express')  //Biblioteca para cria o servidor
const server = express()
const routes = require('./routes')  // Importando routes (rotas)
const path = require('path')

// Usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habilitar arquivos statics
server.use(express.static("public"))    // Usando o a pasta public como diretorio padrão para imagens, estilo e scripts

// Permite usar o req.body
server.use(express.urlencoded({ extended: true }))

// Usando o routes.js para definir as rotas
server.use(routes)

server.listen(3000, () => console.log('rodando'))   // Rodando o servidor escutando a porta 3000
