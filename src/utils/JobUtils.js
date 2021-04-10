module.exports = {
    remainingDays: job => {
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
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}