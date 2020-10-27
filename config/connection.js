const mysql = require('mysql');
const setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};
const con = mysql.createConnection(setting);

con.connect( function (error) {
    if (error) {
        console.log("setting::", JSON.stringify(setting));
        throw error;
    }
});

module.exports = con;