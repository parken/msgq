const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const pkg = require('../package.json');

const root = path.normalize(__dirname + '/..');
const envFile = path.join(root, '.env');
let config = {};

if(fs.existsSync(envFile)) {
  const env = dotenv.config({ path: envFile });
  config = env.parsed || env;
} else {
  console.log(`.env file not found.
  Please create manually or visit http://localhost:3000
  Learn more at check installation docs at https://github.com/parken/msgque/blob/${pkg.version}/docs/Installation.md
  Trying to connect with default settings.
  `);
}
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const settings = {
  database: config.MYSQL_DB || 'msgque',
  username: config.MYSQL_USER || 'root',
  password: config.MYSQL_PASS || '',
  dialect: 'mysql',
  host: config.MYSQL_HOST ||  'localhost',
  port: config.MYSQL_PORT || 3306,
};

module.exports = {
  development: settings,
  production: settings,
};
