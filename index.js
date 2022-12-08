const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

//middleware
//handles cross requests
app.use(cors())
//line to convert body to json: it used to be body parser but now it's integrated
app.use(express.json());

app.get("/", (req, res) => {res.json("hello")})
//ROUTES
//create a todo
// app.post("/register", async(req, res) => {
//    JSON
//    {
//       roomNumber
//       roomStatus
//       groupid
//    }
//    try {
//       //destructuring syntax
//       const {roomnumber, roomstatus, groupid} = req.body;
//       // way 1
//       // const sqlc = "insert into todo (description) values($1) returning *"
//       // const newTodo = await pool.query(sqlc,[description])
//       //way 2
//       // way 1 is easier.
//       const sqlc = "insert into rooms (roomnumber,roomstatus,groupid) values($1,$2,$3) returning *";
//       const newTodo = await pool.query(sqlc,[]);
//       //res.json sends a json response
//       res.json(newTodo.rows[0])
//    } catch (err) {
//       console.error(err.message);
//    }
// })

// // get all todos
app.get("/todos", async(req, res) => {
   try {
      const sqlc = "select * from todo"
      const toDoList = await pool.query(sqlc);
      res.json(toDoList.rows);

   } catch (err) {
      console.error(err.message)
   }
})

// //get a todo
// app.get("/todos/:id", async (req, res) => {
//    try{
//       const {id} = req.params;
//       const sqlc = "select * from todo where todo_id = $1";
//       const toDo = await pool.query(sqlc,[id])
//       res.json(getToDo.rows[0])
//    }catch (err) {
//       console.error(err.message);
//    }
// });

// update a todo
app.put("/updateStatus/:roomNumber/:roomStatus", async (req, res) => {
   try{
      const {roomNumber,roomStatus} = req.params;
      // const {roomStatus} = req.body;
      const sqlc = "update rooms set roomStatus = $1 where roomNumber = $2";
      const updateToDo = await pool.query(sqlc,[roomStatus,roomNumber]);
      res.json("Room Updated")
   }catch (err) {
      console.error(err.message);
   }
});

// // delete a todo

// app.delete("/todos/:id", async (req, res) => {
//    try {
//       const {id} = req.params;
//       const deleteTodo = await pool.query(
//          "DELETE FROM todo WHERE todo_id = $1", [id]
//       );
//       res. json(" Todo was deleted!");
//    }catch (err) {
//       console.log(err.message);
//    }
// });

app.listen(3000, () => {
   console.log("server has started on port 3000")
})