const Database = require('./config')

const initDb = {

    async init() {
        const db = await Database()     // Abre a conexão com o banco de dados

        await db.exec(
            `CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget FLOAT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour FLOAT
        );`)

        await db.exec(
            `CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        );`)


        await db.run(
            `INSERT INTO profile (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour) VALUES
            ('Lucas de Paula Oliveira Santos', 'https://github.com/LukeBreezy.png', 6000.25, 4, 8, 8, 75);`
        )

        await db.run(
            `INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES
            ('Pizzaria Guloso', 2, 1, ${Date.now()}),
            ('OneTwo Projects', 3, 47, ${Date.now()});
        `)
        await db.close()    // Encerra a conexão com o banco de dados
    }
}

initDb.init()