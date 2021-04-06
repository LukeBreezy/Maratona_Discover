let data = {
    "name": 'Lucas',
    "avatar": 'https://github.com/LukeBreezy.png',
    "monthly-budget": 6000,
    "days-per-week": 4,
    "hours-per-day": 8,
    "vacation-per-year": 5,
    "value-hour": 99.90
}

module.exports = {
    get(){
        return data
    },

    update(newData){
        data = newData
    }
}