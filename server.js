import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import mysql from 'mysql';
import dotenv from 'dotenv'


dotenv.config();


var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

  const app = express();

app.use(express.static('public'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// default index route
app.post('/data', (req, res) => {
    console.log(req.body)


    /*
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
      */
    res.send('Data received!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../dist/index.html`));
});


// START THE SERVER
// =============================================================================
const PORT = process.env.PORT || 9090;
app.listen(PORT);
console.log(`listening on: ${PORT}`);
