const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Stay, List } = require('../database/index');
// const { List } = require('../database/list');

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));
// Get all stays
app.get('/stays', (req, res) => {
  Stay.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(data);
  });
});
// Specific Stay
app.get('/photo/stays/:roomId', (req, res) => {
  const { roomId } = req.params;
  Stay.find({ room_id: roomId }).exec((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Get All Lists
app.get('/photo/list', (req, res) => {
  List.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(data);
  });
});
// Post to list collection
app.post('/photo/list', (req, res) => {
  //console.log("Post req ", req.body);
  List.create(req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
