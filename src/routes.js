const express = require('express')  // Biblioteca para criar o servidor
const routes = express.Router()     // Ser para criar as rotas / caminhos

const views = __dirname + "/views/"

const Profile = {
    data: {
        "name": 'Lucas',
        "avatar": 'https://github.com/LukeBreezy.png',
        "monthly-budget": 6000,
        "days-per-week": 4,
        "hours-per-day": 8,
        "vacation-per-year": 5,
        "value-hour": 99.90
    },

    controllers: {
        index(req, res){
            return res.render(views + "profile", {profile: Profile.data})
        },

        update: (req, res) => {
            // Pegando os dados do perfil
            const data = req.body

            // Semanas em 1 ano = 52
            const weeksPerYear = 52

            // Removendo as semanas de férias
            const weekPerMonth = (weeksPerYear - data['vacation-per-year'])/ 12

            // Horas trabalhadas por semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // Horas trabalhadas por mês
            const hoursPerMonth = weekTotalHours * weekPerMonth

            // Qual o valor da minha hora?
            data["value-hour"] = data["monthly-budget"] / hoursPerMonth

            Profile.data = data
            /* Tambem posso fazer da seguinte forma
            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": data["monthly-budget"] / hoursPerMonth
            }
            */

            return res.redirect('/profile')
        }
    }
}



const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            budget: 4500,
            remaining: 5,
            status: 'progress'
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
            budget: 4500,
            remaining: 3,
            status: 'done'
        }
    ],

    controllers: {
        index: (req, res) => {
            const updatedJobs = Job.data.map((job) => {
        
                const remaining = Job.services.remainingDays(job)
        
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return{
                    ...job,
                    remaining,
                    status,
                    budget: (Profile.data["value-hour"] * job["total-hours"])
                }
            })

            Job.data = updatedJobs

            console.log(updatedJobs)
            res.render(views + "index", { jobs: updatedJobs, profile: Profile.data})
        },

        create(req, res){ 
            return res.render(views + "job")
        },
        
        save: (req, res) => {
            // Exemplo de req.body:
            // req.body == {name: 'DedSec Site', 'daily-hours': '8', 'total-hours': '40'}
            
            const job = req.body
        
            // Determinando o ID
            const job_id = (Job.data[Job.data.length - 1]?.id || 0) + 1     // o ? é um optional chaining
            job.id = job_id
            job.created_at = Date.now()
        
            Job.data.push(job)

            return res.redirect('/')
        },

        show: (req, res) => {

            jobId = req.params.id

            job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send("Job not found!")
            }

            return res.render(views + "job-edit", { job })
        },

        update: (req, res) => {

            jobId = req.params.id

            job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send("Job not found!")
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            return res.render(views + "job-edit", { job })
        },

        delete: (req, res) => {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },
    
    services: {
        remainingDays(job){
            // Ajustes no job
            // Total de dias do job
            const totalDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            
            // Data de criação do job
            const createdDate = new Date(job.created_at)
        
            // Data de encerramento do job
            const dueDay = createdDate.getDate() + Number(totalDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            // Dias restantes com base na data atual
            const timeDiffInMs = dueDateInMs - Date.now()
        
            // Convertendo para ms
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            // Retorna os a quantidade de dias restantes
            return dayDiff
        }
    }
}

// ROTAS GET E POST

// Index
routes.get('/', Job.controllers.index)


// Job
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)


// Job-edit
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)


// Profile
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;    // Exportando routes