const { Client } = require('pg')
const cs = 'postgres://postgres:root@localhost:5432/mxproductdb';
const client = new Client(cs)
module.exports = client