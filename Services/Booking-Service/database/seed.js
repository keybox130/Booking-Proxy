const db = require('./index.js');

const random = (min, max) => {
  const num = min + Math.floor(Math.random() * (max - min));
  return num.toString();
};

const randomBool = () => {
  const i = random(1, 10);
  if (i % 2 === 0) {
    return true;
  }
  return false;
};

const generateSeedData = () => {
  let roomId = 1;
  const result = [];
  for (let i = 0; i < 100; i += 1) {
    const obj = {};
    const ratingsCount = random(15, 460);
    const ratingsSum = `${random(1, 5)}.${random(1, 99)}`;
    const maxGuests = random(3, 6);
    const minDays = random(1, 30);
    const serviceFee = `${random(3, 5)}.${random(1, 99)}`;
    const baseNightlyPrice = `${random(41, 556)}.${random(1, 99)}`;
    const startingDate = new Date();
    const weeklyDiscount = { discount: randomBool(), percentage: random(5, 25) };
    const monthlyDiscount = { discount: randomBool(), percentage: random(5, 25) };
    const alreadyBooked = [];
    const taxesFees = random(3, 9);
    const additionalPersonTax = random(3, 9);
    obj.room_id = roomId;
    roomId += 1;
    obj.ratings_count = ratingsCount;
    obj.ratings_sum = ratingsSum;
    obj.max_guests = maxGuests;
    obj.min_days = minDays;
    obj.service_fee = serviceFee;
    obj.base_nightly_price = baseNightlyPrice;
    obj.starting_date = startingDate;
    obj.weekly_discount = weeklyDiscount;
    obj.monthly_discount = monthlyDiscount;
    obj.already_booked = alreadyBooked;
    obj.taxes_fees = taxesFees;
    obj.additional_person_tax = additionalPersonTax;
    result.push(obj);
  }
  return result;
};

const seed = () => {
  const arr = generateSeedData();
  db.Room.insertMany(arr, (err, docs) => {
    if (err) {
      console.log(`Err @ [seed - insertMany ] ::: ${err}`);
    } else {
      console.log(`Seeding complete ::: ${docs}`);
    }
  });
};

seed();
