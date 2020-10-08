const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/airbnb', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', () => { console.error.bind(console, 'connection error:'); });
db.once('open', () => { console.log('Connection open!'); });

const listingSchema = mongoose.Schema({
  // id: { type: Number, unique: true },
  id: Number,
  photos: [
    {
      superhost: Boolean,
      heart: Boolean,
      rating: String,
      reviews: String,
      listing: String,
      title: String,
      price: String,
      image: String,
    },
  ],
});

const Listing = mongoose.model('Listing', listingSchema);

const favoritesSchema = mongoose.Schema({
  id: Number,
  name: String,
  count: Number,
  img: String,
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = {
  Listing,
  Favorites,
  db,
};
