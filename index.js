const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db.js")

app.use(cors())
app.use(express.json());

app.get("/", async(req, res) => {
   res.json("hello")

})
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

// // get rooms
app.get("/rooms/:groupId", async(req, res) => {
   try {
      const {groupId} = req.params;
      const sqlc = "SELECT roomnumber,roomstatus FROM rooms WHERE groupid = $1";
      const getRooms = await pool.query(sqlc, [groupId]);

      res.json(getRooms.rows);

   } catch (err) {
      console.error(err.message)
   }
})

// updates current room status
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

// 
app.get("/notification/:toRoom", async(req,res) => {
   try{
      const {toRoom} = req.params
      // res.json(toRoom)
      // console.log(toRoom)
      const sqlc = "select * from notification where is_read = false and toroom = $1";
      const notification = await pool.query(sqlc,[toRoom]);
      // console.log(notification)
      res.json(notification.rows)
   }catch(err){
      console.error(err.message)
   }
});

// This implementation is for from room and to rooms
app.get("/ping/:fromRoom/:toRoom", async (req,res) => {
   try{
      const {fromRoom, toRoom} = req.params
      const sqlc = "insert into notification (fromroom,toroom) values($1,$2)"
      const pingMsg = await pool.query(sqlc,[fromRoom,toRoom]);
      res.json("Insert Successful")
   }catch (err) {
      console.error(err.message)
   }
});



// app.post("/todos", async(req, res) => {
//    try {
//       //destructuring syntax
//       const {description} = req.body;
//       // way 1
//       // const sqlc = "insert into todo (description) values($1) returning *"
//       // const newTodo = await pool.query(sqlc,[description])
//       //way 2
//       // way 1 is easier.
//       const sqlc = `insert into todo (description) values('${description}') returning *`;
//       const newTodo = await pool.query(sqlc);
//       //res.json sends a json response
//       res.json(newTodo.rows[0])
//    } catch (err) {
//       console.error(err.message);
//    }
// })


app.listen(3000, () => {
   console.log("server has started on port 3000")
})