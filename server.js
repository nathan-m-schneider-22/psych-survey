import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { parse } from 'path';

import mysql from 'mysql';
import dotenv from 'dotenv'
import {makeQuery} from './parseData'

dotenv.config();


var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });
  
  const app = express();

app.use(express.static('public'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// default index route
app.post('/data', (req, res) => {
    // console.log(req.body)

        const query = makeQuery(req.body.data)
        con.query(query, function (err, result) {
          if (err) console.log(err);
          else console.log("Data recorded");
        });
    res.send('Data received!');
});




// START THE SERVER
// =============================================================================
const PORT = process.env.PORT || 9090;
app.listen(PORT);
console.log(`listening on: ${PORT}`);
