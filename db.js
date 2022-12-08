const Pool = require('pg').Pool;

const pool = new Pool({
   user: "postgres",
   password: "",
   host: "localhost",
   port: 5432,
   database: "room-status-db"
})

module.exports = pool
// const Pool = require('pg').Pool;

// const pool = new Pool({
//    user: "room_status_db_user",
//    password: "E859GVjs389UEy5pSgUqh7Gg0n33RjKQ",
//    host: "dpg-ce8n5a6n6mposnkvtqh0-a",
//    port: 5432,
//    database: "room_status_db"
// });

// module.exports = pool