const Job = require('../model/Job')
const jobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const { update } = require('../model/Job')

module.exports = {
    async index(req, res){
        // Pegando Jobs e Profile
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let jobTotalHours = 0
        
        // Inserindo prazo, andamento e budget do job
        const updatedJobs = jobs.map((job) => {

            const remaining = jobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            jobTotalHours += status === 'progress' ? Number(job["daily-hours"]) : 0

            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // Definindo os status do perfil:
            //total de jobs, jobs em andamento e encerrados
        const statusCount = {
            progress: updatedJobs.filter(job => job.status === 'progress').length,
            done: updatedJobs.filter(job => job.status === 'done').length,
            total: jobs.length
        }

        // Quantidade de horas livres, baseado na quantidade de horas por dia definida no perfil
        const freeHours = profile["hours-per-day"] - jobTotalHours

        res.render("index", {
            jobs: updatedJobs,
            profile: profile,
            status: statusCount,
            freeHours: freeHours
        })
    }
}
