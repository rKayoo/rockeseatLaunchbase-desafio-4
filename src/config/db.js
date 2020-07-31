const { Pool } = require('pg');

module.exports = new Pool({
  user:'rafaelkayo',
  password:'',
  host:'localhost',
  port: 5432,
  database:'my_teacher'
});