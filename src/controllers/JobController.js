const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    create(req, res){ 
        return res.render("job")
    },
    
    async save(req, res){
        // Exemplo de req.body:
        // req.body == {name: 'DedSec Site', 'daily-hours': '8', 'total-hours': '40'}

        await Job.create({
            ...req.body,
            created_at: Date.now()    
        })

        return res.redirect('/')
    },

    // Exibe a página para edição do job
    async show(req, res){

        const profile = await Profile.get()
        const jobs = await Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render("job-edit", { job })
    },

    // Atualiza o job com as novas informações
    async update(req, res){

        // Encontra o job que será atualiado
        const jobs = await Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        // Mensagem de erro caso o job não seja encontrado
        if(!job){
            return res.send("Job not found!")
        }

        // Realizando as alterações do job
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        // Enviando o job atualizado para o banco de dados
        await Job.update(updatedJob)

        return res.redirect("/job/" + jobId)
    },

    // Apaga um job
    async delete(req, res){
        
        const jobId = req.params.id
        
        await Job.delete(jobId)

        return res.redirect('/')
    }
}