import debug from 'debug';
import fs from 'fs-promise';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';

import { setupCompleted, envFile } from '../../config/env';

const log = debug('components/setup');
const IST = '+05:30';

function serveForm({ values = {}, err = '' } = {}) {
  return (req, res) => {
    const captions = {
      MYSQL_DB: 'Database name',
      MYSQL_USER: 'Database Username',
      MYSQL_PASS: 'Database Password',
      MYSQL_HOST: 'Database Host',
      MYSQL_TZ: 'Timezone',
      PORT: 'Application Port',
    };
    const numuricFields = ['PORT'];
    const timezones = [IST];

    return res.send(`
        <form
          method="post"
          style="text-align: center; margin: auto; margin-top: 10%; width: 500px;">
        <h2>MSGQue</h2>
        <p><a href="https://github.com/parken/msgque">Setup Instructions</a></p>
        <p style="color:red">${err.toString()}</p>
         <br><br>
          ${
      Object.keys(captions)
        .map(key => {
          const field = captions[key];
          if (key === 'MYSQL_TZ') {
            return `<br> <br> <br>
                  ${field}:
                  <select
                    name="${key}"
                    value="${field ? `${field}` : ''}">
                    <option value="">Select</option>
                    ${
              timezones.map(t =>
                `<option ${process.env.TZ === t ? 'selected="true"' : ''}">${t}</option>`)
              }
                    </select>
                `;
          }

          return `<br>
                  ${field}:
                  <input
                    type="${numuricFields.includes(field) ? 'number' : 'text'}"
                    name="${key}"
                    value="${values[key] ? `${values[key]}` : ''}">
                `;
        })
      }
          <br><br><br>
          <input type="submit">
        </form>
      `);
  };
}

function setup() {
  return (req, res, next) => {
    if (setupCompleted) return next();
    if (req.method === 'GET') return serveForm()(req, res, next);
    const { MYSQL_DB, MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_TZ } = req.body;
    const conn = new Sequelize(
      MYSQL_DB, MYSQL_USER,
      MYSQL_PASS, { host: MYSQL_HOST, dialect: 'mysql', timezone: MYSQL_TZ }
    );
    const defaults = {
      MYSQL_HOST: 'localhost',
      MYSQL_TZ: IST,
    };
    const env = Object
      .keys(Object.assign(defaults, req.body))
      .reduce((nxt, key) => `${nxt}${key}=${req.body[key]}\r\n`, '');

    console.log(envFile, 'env', env, envFile);
    return conn
      .authenticate()
      .then(() => fs
        .writeFileSync(envFile, env))
      .then(() => {
        res.end(`
        <html>
          <head><meta http-equiv="refresh" content="10;url=/"></head>
          <body>
            <h3> MSGQue Getting Ready for you...</h3>
            <p> writing <span style="color:red">.env</span> file with database settings</p>
            <p> Restarting server.
            <p>for successful restart, PM2 or Systemd Process Management required.
            If you not using Systemd or PM2. Please start manually</p>
            </p>

            <p> <a href="https://github.com/msgque/msgque" target="_blank">Learn more</a></p>
          </body>
        </html>`);
        return process.exit(0);
      })
      .catch(err => serveForm({ values: req.body, err })(req, res, next));
  };
}

export function init(app) {
  console.log('.env file not created ? : ', setupCompleted, envFile);
  if (!setupCompleted) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(setup());
  }
}

