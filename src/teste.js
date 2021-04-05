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


module.expor