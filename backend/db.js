// backend/db.js

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'vincentmartin',
  host: 'localhost',
  database: 'linktree',
  password: 'postgres',
  port: 5432
});

module.exports = pool;