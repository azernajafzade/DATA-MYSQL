/////////////////////////////////////////////////////////////////

const express = require ("express");
const mysql = require ("mysql2");
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use (cors());


let connection = mysql.createConnection({
    host: "bzk8ykw9bqvggrr7cnpg-mysql.services.clever-cloud.com",
    user: "u1cvsdlldgnvwby3",
    password: "BTjDU4GCcvqGxbYHt5tC",
    database: "bzk8ykw9bqvggrr7cnpg",
  });

  /////////////////////////////////////////////////////////////////
  app.get("/", function (req, res) {    
    connection.query("select * from data1", function (err, result, fields) {
      //   console.log(err);
        console.log(result);
      //   console.log(fields);
      res.send(result);
    });
  });
//////////////////////////////////////////////////////////////////
  app.get("/:id", (req, res) => {
    const elem = req.params;
    // sql id get method
    connection.query("select * from data1", function (err, result, fields) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (elem.id == result[i].ID) {
          res.send(result[i]);
        }
      }
    });
  });
  ////////////////////////////////////////////////////////////////
  app.delete("/:id", (req, res) => {
    const elem = req.params.id;
    
    connection.query(
      `DELETE FROM data1 WHERE ID=${elem}`,
      function (err, result, fields) {
        console.log(result);
      }
    );
    // axios.delete("http://localhost:3000/" )
  });
  ///////////////////////////////////////////////////////////////
  // post method
app.post("/", (req, res) => {
    let obj = req.body;

    connection.query(
      `INSERT INTO users (ID, Firstname, Lastname,)
      VALUES ("${obj.ID}", "${obj.Firstname}", "${obj.Lastname}",)`,
      function (err, result, fields) {
        //   console.log(result);
        //   app.get("/users", function (req, res) {
        //     res.send(result);
        //   });
      }
    );
    connection.query("select * from data1", function (err, result, fields) {
      //   console.log(err);
      console.log(result);
      res.send(result);
    });
    // axios.post("http://localhost:3000/")
  });

  app.listen(process.env.PORT || 3000)
