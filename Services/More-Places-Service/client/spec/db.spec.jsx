const express = require('express');
const db = require('../../database/index.js');

describe('Database API', () => {
  test('it should connect to the database', (done) => {
    // after the database is open, verify the connection was successful
    db.db.once('open', () => {
      try {
        expect(db.db.name).toEqual('airbnb');
        done();
      } catch (error) {
        done(error);
      }
    });
    db.db.on('error', () => {
      done(new Error('Could not connect to database.'));
    });
  });
});
