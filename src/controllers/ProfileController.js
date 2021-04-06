const Profile = require('../model/Profile')

module.exports = {
    index(req, res){
        return res.render("profile", { profile: Profile.get() })
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

        const profile1 = Profile.get()

        // Qual o valor da minha hora?
        data["value-hour"] = data["monthly-budget"] / hoursPerMonth

        Profile.update(
            data
        )

//        Profile.get() = data
        /* Tambem posso fazer da seguinte forma
        Profile.get() = {
            ...Profile.get(),
            ...req.body,
            "value-hour": data["monthly-budget"] / hoursPerMonth
        }
        */

        return res.redirect('/profile')
    }
}