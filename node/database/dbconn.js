const mariadb = require("mariadb")

const createPool = () => {
    try {
        return (
            mariadb.createPool({
                connectionLimit: 10,
                password: process.env.DB_PASSWORD,
                user: process.env.DB_USERNAME,
                database: process.env.DB_DATABASE,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT
            })
        )
    }
    catch (err) {
        console.error('Failed to connect to database: ')
        console.error(err)
    }
}

const pool = createPool()
module.exports = pool
