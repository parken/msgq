/***
 * https://github.com/manjeshpv/playSMS/blob/master/install-playsms.sh
 * https://github.com/antonraharja/playSMS/blob/fb2c20a5fed84cd1d189b5ac595f2ef87b365984/web/config-dist.php
 */

const path = require('path');
const _ = require('lodash');
const dotenv = require('dotenv');
const root = path.normalize(`${__dirname}/../../..`);
const env = dotenv.config({ path: path.join(root, '.env') });
// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  PLAY_URL: process.env.PLAY_URL,
  MSG: process.env.MSG,
  PLIVO_AUTH_ID: process.env.PLIVO_AUTH_ID || 'id',
  PLIVO_AUTH_TOKEN: process.env.PLIVO_AUTH_TOKEN || 'token',

  db: {
    type: process.env.DBTYPE || 'mysql',
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || 3306,
    user: process.env.DBUSER || 'root',
    pass: process.env.DBPASS || '',
    name: process.env.DBNAME || 'playsms',
    tz: process.env.TZ || process.env.DBTZ || '+05:30',
    pref: process.env.DBPREF || 'playsms',
  },

  HTTP_HOST: process.env.HTTP_HOST,
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  env,
  require(`./${process.env.NODE_ENV}.js`) || {});
