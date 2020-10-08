const path = require('path');
const express = require('express');
const db = require('../database');

const port = 3002;
const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/calendar/stays/:stayId', (req, res) => {
  const data = req.params.stayId;
  db.getRoomData(data, (err, results) => {
    if (err) {
      console.log(`Err @ [ app.get ] ::: ${err}`);
      res.status(400).send(err);
    } else {
      console.log('Get Successful');
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => console.log(`Listening @ http://localhost:${port}`));
