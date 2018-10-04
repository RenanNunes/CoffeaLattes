const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'mongodb://admin:DJm4L5BcE3Wkg8C@ds016068.mlab.com:16068/coffealattes_db_teste';
const db = monk(connectionString);

module.exports = db;
