import knex from "knex";

const db2 = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
});

export default db2;
