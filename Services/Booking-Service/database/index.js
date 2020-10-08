const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookings', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Err'));
db.once('open', () => console.log('We are connected'));

const schema = mongoose.Schema({
  room_id: String,
  ratings_count: String,
  ratings_sum: String,
  max_guests: String,
  min_days: String,
  service_fee: String,
  base_nightly_price: String,
  starting_date: Date,
  weekly_discount: Object,
  monthly_discount: Object,
  already_booked: [],
  taxes_fees: String,
  additional_person_tax: String,
});

const Room = mongoose.model('Room', schema);

const getRoomData = (data, callback) => {
  const obj = { room_id: data };
  Room.find(obj, (err, docs) => {
    if (err) {
      console.log(`Err @ [ getRoomData ] ::: ${err}`);
      callback(err);
    } else {
      console.log('Fetch @ [ getRoomData ] Sucessfull');
      callback(err, docs);
    }
  });
};

module.exports.getRoomData = getRoomData;
module.exports.Room = Room;
// Run the script.
// seed();
