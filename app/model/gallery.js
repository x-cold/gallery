'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults;
db.defaults({ galleries: [] })
  .write();

module.exports = db;
