CREATE DATABASE perntodo;

-- primary key keep it's uniquness between tables
-- serial ensures it's not repeated
CREATE TABLE todo(
   todo_id SERIAL PRIMARY KEY,
   description VARCHAR(255 )

)
-- \c dbname -> to access the database in psql\

CREATE TABLE todo(
   uuid SERIAL PRIMARY KEY,
   roomNumber INT(255),
   roomStatus BOOL,
   groupid INT(255)
);


CREATE TABLE notification(
   fromRoom int,
   toRoom int
);