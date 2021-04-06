let data = [
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
]

module.exports = {
    get() {
        return data
    },

    update(newData) {
        data = newData
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    },
}