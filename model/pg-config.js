const { Pool } = require('pg')
const pg_connection = new Pool({
    user: 'ktddxpmlrknzvh',
    host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
    database: 'deskkttup45o07',
    password: 'fbd9b1c6f8667bd44adf85f66528cf9e71b18b1b335f37d29b185b44d27fa377',
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }
})
module.exports = pg_connection