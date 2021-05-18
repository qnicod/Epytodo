const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const env = process.env;
const connection = mysql2.createConnection({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_ROOT_PASSWORD,
    database: env.MYSQL_DATABASE
});

connection.connect(err => {
    if (err)
        console.log(err);
    console.log("Successfully connected to the database");
});

module.exports = connection;