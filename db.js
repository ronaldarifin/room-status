// const Pool = require('pg').Pool;

// const pool = new Pool({
//    user: "postgres",
//    password: "",
//    host: "localhost",
//    port: 5432,
//    database: "perntodo"
// })

// module.exports = pool
const Pool = require('pg').Pool;

const pool = new Pool({
   user: "pern_todo_list_user",
   password: "KEZLZ6dl4ovpDmvvz4vjHpn1ZZ4oZ9FV",
   host: "dpg-ce17da82i3mkuceitnlg-a",
   port: 5432,
   database: "pern_todo_list"
});

module.exports = pool