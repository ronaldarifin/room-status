CREATE DATABASE perntodo;

-- primary key keep it's uniquness between tables
-- serial ensures it's not repeated
CREATE TABLE todo(
   todo_id SERIAL PRIMARY KEY,
   description VARCHAR(255 )

)
-- \c dbname -> to access the database in psql\

CREATE TABLE rooms(
   uuid SERIAL PRIMARY KEY,
   roomNumber INT,
   roomStatus BOOL,
   groupid INT
);


CREATE TABLE notification(
   fromRoom int,
   toRoom int
);

insert into rooms (roomnumber,roomstatus,groupid) values(321,False,11);
insert into rooms (roomnumber,roomstatus,groupid) values(516,False,11);
insert into rooms (roomnumber,roomstatus,groupid) values(221,False,13);

