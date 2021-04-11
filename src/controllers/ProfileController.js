const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res){
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

        await Profile.update(
            data
        )

        return res.redirect('/profile')
    }
}