import knex from 'knex';

const db2 = knex({
    client: 'pg',
    connection: {
    // host : 'localhost', 
    // port : '5432', 
    // user : 'postgres', 
    // password : 'postgres', 
    // // database : 'gfguide',
    // database : 'dbtest',
    host : 'awseb-e-rvy2jemfqh-stack-awsebrdsdatabase-wsddots0p7bn.c38qkcqvjf1o.eu-central-1.rds.amazonaws.com', 
    port : '5432', 
    user : 'postgres', 
    password : 'postgres', 
    database : 'ebdb',
    }
})

export default db2