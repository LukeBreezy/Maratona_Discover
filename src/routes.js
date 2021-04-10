const express = require('express')  // Biblioteca para criar o servidor
const routes = express.Router()     // Ser para criar as rotas / caminhos
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

// ROTAS GET E POST

// Index
routes.get('/', DashboardController.index)


// Job
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)


// Job-edit
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)


// Profile
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;    // Exportando routes