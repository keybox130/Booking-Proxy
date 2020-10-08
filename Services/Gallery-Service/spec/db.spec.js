const db = require('../database/index.js');

describe('Database test', () => {
  test('Connected to database', done => {
    db.db.once('open', () => {
      try {
        expect(db.db.name).toEqual('gallery');
        done();
      }
      catch (error) {
        done(error);
      }
    });
    db.db.on('error', () => {
      done(new Error('Failed to connect to database.'));
    });
  });
});
