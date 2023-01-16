const mariadb = require('mariadb');

module.exports = mariadb.createPool({
    password: "Victorerenkvinde123",
    user: "sysadmin",
    database: "HF5Test",
    host: "mariadb",
    port: "3306"
});
