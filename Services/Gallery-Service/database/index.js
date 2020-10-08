const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gallery', { useNewUrlParser: true });

// Connection shortcut
const db = mongoose.connection;
// Test connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the DataBase');
});

// Define Schema
const schema = mongoose.Schema({
  room_id: Number,
  list: String,
  title: String,
  rating: Number,
  rating_count: Number,
  super_host: Boolean,
  location: String,
  photos: [{
    id: Number,
    photo_url: String,
    description: String,
  }],
});

// Create model
const Stay = mongoose.model('Stay', schema);

// Define Schema
const ListSchema = mongoose.Schema({
  list_id: Number,
  tmb_url: String,
  title: String,
  number: Number,
  tmb_url: '',
});

// Create model
const List = mongoose.model('List', ListSchema);

module.exports = {
  Stay,
  List,
  db,
};
