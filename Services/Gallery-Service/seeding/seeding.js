const mongoose = require('mongoose');
const { Stay, db } = require('../database/index');

db.dropDatabase();
// Contains images from 5 of the 10 available image folders.
const imgUrls = ['https://imagesfec.s3.amazonaws.com/airbnb/1/5a7c23f7-4216-4130-9b2a-a71ba487.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/1/8a379cb5-0feb-403c-9b2d-3093e51a.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/1/ad503ffe-5394-4b75-8b49-97bdb9ef.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/1/bbb0e0d0-1e9c-4cc7-aeed-50b87add.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/1/ed3921e7-2c6e-451b-a375-1179dae4.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/1/ed49f1d8-757c-4162-8124-f2807a43.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/092adb4e-4038-4629-a94c-869a7187.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/0a818d77-62b4-44f4-aa43-63be8942.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/0c4ac027-7034-4bc3-bdc9-11dddaff.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/520540e5-435b-47e5-97a7-56fcd41b.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/d4c0118c-a699-4661-951c-0602175a.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/2/f677abc9-50b6-48d9-95d0-f0010042.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/000f7a0d-75c9-41c1-95fd-e4ab2d1b.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/d7d9531e-15da-4f25-b919-5a43401e.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/ca9d61c8-b75a-4e1b-bd3e-61eedaf6.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/a2a6ab9f-9722-4227-944a-c6b1a5d3.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/18d6f4ab-ec8b-47a4-accb-cc8dc9c9.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/3/000f7a0d-75c9-41c1-95fd-e4ab2d1b.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/30b9d564-c24f-41a4-8404-9d3456b5.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/620e64bc-fd62-41e0-b4c4-215adf30.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/8a5824ec-b3e1-4a7b-9525-dbdf2f4f.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/b51859e7-2fb8-48a9-b808-862f2a21.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/cb3b7947-fb88-4fa1-8a93-8d277b51.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/4/cc51b7cf-3c44-44c0-b62e-85df5c78.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/2a07a239-e935-42e1-8e11-4efe53ee.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/4687acd2-bc5b-440e-b02f-75ed2ead.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/51e075f8-beec-4b8c-aad8-2511f1e5.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/78d5210f-05d9-4ad9-99a4-845f6159.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/99a47af0-bc9a-41ca-ab27-ca926fc2.jpg', 'https://imagesfec.s3.amazonaws.com/airbnb/5/fa5faf14-4cc9-4419-857b-adcd4bfd.jpg'];
// Image description
const imageDesc = ['Living Room', 'Dining Room', 'Kitchen', 'Bedroom', 'Breakfast Nook', 'Bathroom', 'Welcome Home', 'Comfortable Queen Bed', 'Flat screen cable TV and Comcast High Speed Internet.', 'Small Kitchen', 'Coffee Maker and Coffee', 'Bathroom with Shower', 'Off grid cob house on forty acres. Close to shower, outhouse and picnic table', 'The Cob House is in a very private setting all your own. Bring a camp stove and an ice chest and make your meals on the picnic table there.', 'The down comforter and extra blankets, 100% cotton sheets on this double bed. Warmed by the cob houses insulation and a propane heater if needed .', 'Our greenhouse covered outdoor shower in old redwood stumps. Surrounded on three sides by a bathhouse.', 'The outdoor shower', 'Our cute dog Scout will greet you. Dogs are okay with an extra $20 a night fee.', 'Cozy and tucked in.', 'The front porch', 'Propane fireplace and small kitchenette', 'Cozy queen-sized bed', 'Convertible sofa', 'Real bed! Built in', '"Smart" TV and WiFI', 'Living Area', 'Sleeper couch, fireplace, & TV', 'Sleeper couch and futon single bed', 'Kitchen and dining area', 'Front door (left) and pantry (right)', 'Work desk - if you have to work during your stay', ''];
// console.log('Image Descripton Length: ', imageDesc.length);

// Stay Name
const stayName = ['Charming Craftsman East Sac/Midtown Apartment', 'Cozy Napa Wine Country Studio', 'The Cob house', 'Marina District Private Rooftop Studio with Deck', 'Serenity Seaside Garden Cottage (no cleaning fee)', 'Detached Wine Country "tiny house"', 'Sunset Yurt – stunning infinity pool', 'Downtown Cottage - Walk to Plaza!', 'Redwoods Treehouse', 'Bird Glamping', 'El Avistador. Montes de Toledo', 'Shepherd,s Hut with hot tub use near Stonehenge'];
// console.log('Stay Name Length: ', stayName.length);

// Super Host
const stayLocation = ['Sacramento', 'Angwin', 'Gualala', 'San Francisco', 'Santa Rosa', 'Garden Valley', 'Healdsburg', 'Sea Ranch', 'Sesquilé', 'Sonseca', 'DeLand Southwest', 'McKean', 'Fisher Island', 'Friendswood', 'Pewee Valley', 'Falling Waters', 'Anchor Bay', 'Poplar', 'Corona de Tucson', 'Longtown', 'Fidelity', 'Tropic', 'Pueblito del Carmen', 'Halstead', 'Tully', 'Miami Lakes', 'Maynard', 'Ocean City', 'Dillwyn', 'Lorenz Park', 'Fairacres', 'Hato Candal', 'King William', 'Springs', 'Bull Shoals', 'Upper Bear Creek', 'Watervliet', 'Grey Eagle', 'Kingston', 'Royal Lakes', 'Makakilo', 'Coffeen', 'Spangle', 'Alpine', 'Mango', 'Watsontown', 'Salmon', 'Ravalli', 'Lakewood Shores', 'Barahona', 'Locustdale', 'Dunnell', 'Chester Gap', 'North Fair Oaks', 'La Salle', 'Park Layne', 'Beechmont', 'Cornelia', 'Graceville', 'Trout Valley'];

const stayStateCountry = ', California, United States';

// Random Int generator
const randomInt = (min, max, floor) => {
  if (floor) {
    return Math.floor(min + Math.random() * (max - min));
  }
  const floated = min + (Math.random() * (max - min));
  return floated.toFixed(2);
};

// Super Host Boolean
const superHostBool = () => {
  const decision = randomInt(1, 100, true);
  if (decision < 50) {
    return true;
  }
  return false;
};
// console.log('Super Host Bool: ', superHostBool());

// Rating Generator - This has to be a float
const rating = () => randomInt(3, 5, true);
// console.log('Random Rating: ', rating());

// Review Count
const reviewCount = () => randomInt(1, 300, true);
// console.log('Review Count: ', reviewCount());

// This will output an Array photo OBJs 10 of them for now.
const imageSeeder = () => {
  const result = [];
  const randomImgCount = randomInt(6, 10, true);
  for (let count = 1; count < randomImgCount; count++) {
    const obj = {
      id: count,
      photo_url: imgUrls[randomInt(0, imgUrls.length, true)],
      description: imageDesc[randomInt(0, imageDesc.length, true)],
    };
    result.push(obj);
  }
  return result;
};

// Seed the DB
const dataToSeed = () => {
  const results = [];
  for (let count = 1; count < 101; count++) {
    const obj = {};
    obj.room_id = count;
    obj.list = "";
    obj.title = stayName[randomInt(0, stayName.length, true)];
    obj.rating = randomInt(3, 5, false);
    obj.rating_count = randomInt(10, 300, true);
    obj.super_host = superHostBool();
    obj.location = stayLocation[randomInt(0, stayLocation.length, true)].concat(stayStateCountry);
    obj.photos = imageSeeder();
    results.push(obj);
  }
  return results;
};
// console.log('Data to Seed: ', dataToSeed());

const seedTheDB = () => {
  const arr = dataToSeed();
  Stay.insertMany(arr, (err, docs) => {
    if (err) {
      console.log(`Error in seeding JS line 86 : ${err}`);
      // callback(err);
    } else {
      console.log('Seeding success!');
      // callback(err, docs);
    }
  });
};

seedTheDB();
