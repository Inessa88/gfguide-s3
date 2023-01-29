var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
    user: process.env.DB_USER,
    // For dev, use below
    // host: process.env.DB_HOST,
    host: process.env.DB_HOST_DOCKER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.PORT,
});
client
    .connect()
    .then((result) => {
        console.log("Database connection successful");
    })
    .catch((err) => console.log(err));

module.exports = {
    database: client,
};
