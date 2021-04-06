const Job = require('../model/Job')
const Profile = require('../model/Profile')
const jobUtils = require('../utils/JobUtils')

module.exports = {
    index: (req, res) => {
        const jobs = Job.get()
        const profile = Profile.get()

        const updatedJobs = jobs.map((job) => {
    
            const remaining = jobUtils.remainingDays(job)
    
            const status = remaining <= 0 ? 'done' : 'progress'
    
            return{
                ...job,
                remaining,
                status,
                budget: profile["value-hour"] * job["total-hours"]
            }
        })

        Job.update(
            updatedJobs
        )

        res.render("index", { jobs: updatedJobs, profile: profile})
    },

    create(req, res){ 
        return res.render("job")
    },
    
    save: (req, res) => {
        // Exemplo de req.body:
        // req.body == {name: 'DedSec Site', 'daily-hours': '8', 'total-hours': '40'}
        const job = req.body
        const jobs = Job.get()
    
        // Determinando o ID
        const job_id = (jobs[jobs.length - 1]?.id || 0) + 1     // o ? é um optional chaining
        job.id = job_id
        job.created_at = Date.now()
    
        jobs.push(job)

        return res.redirect('/')
    },

    show: (req, res) => {

        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send("Job not found!")
        }

        return res.render("job-edit", { job })
    },

    update: (req, res) => {

        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send("Job not found!")
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJob = jobs.map(job => {
            if(Number(job.id) === Number(jobId)){
                job = updatedJob
            }
            return job
        })

        Job.update(newJob)

        return res.render("job-edit", { job })
    },

    delete: (req, res) => {
        
        const jobId = req.params.id
        
        Job.delete(jobId)

        return res.redirect('/')
    }
}