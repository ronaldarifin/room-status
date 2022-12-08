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
app.post("/todos", async(req, res) => {
   try {
      //destructuring syntax
      const {description} = req.body;
      // way 1
      // const sqlc = "insert into todo (description) values($1) returning *"
      // const newTodo = await pool.query(sqlc,[description])
      //way 2
      // way 1 is easier.
      const sqlc = `insert into todo (description) values('${description}') returning *`;
      const newTodo = await pool.query(sqlc);
      //res.json sends a json response
      res.json(newTodo.rows[0])
   } catch (err) {
      console.error(err.message);
   }
})

// // get rooms
app.get("/rooms/:groupId", async(req, res) => {
   try {
      const {groupId} = req.params;
      const sqlc = "SELECT roomnumber,roomstatus FROM rooms WHERE groupid = $1";
      const getRooms = await pool.query(sqlc, [groupId]);

      res.json({
         'Room Number' : roomnumber,
         'Status' : roomstatus
      });

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

// // update a todo
// app.put("/todos/:id", async (req, res) => {
//    try{
//       const {id} = req.params;
//       const {description} = req.body;
//       const sqlc = "update todo set description = $1 where todo_id = $2";
//       const updateToDo = await pool.query(sqlc,[description,id]);
//       res.json("Todo List updated")
//    }catch (err) {
//       console.error(err.message);
//    }
// });

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