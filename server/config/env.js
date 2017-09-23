import fs from 'fs';
import path from 'path';
import debug from 'debug';
import dotenv from 'dotenv';

const log = debug('config/env');
const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');
const setupCompleted = fs.existsSync(envFile);
const variables = setupCompleted ? dotenv.config({ path: envFile }) : {};
const auth = {
  google: {
    scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly',
    redirect_uri: 'http://localhost:3000/api/auth/google/callback',
    client_id: '314717213800-ioja19ir5u6kgtq0728p2oe8ku90nvpg.apps.googleusercontent.com',
    client_secret: '8jBw4mLqjawTe8vRpIiL4pKd',
  },
};
const env = Object.assign({ setupCompleted, envFile, root, auth }, variables.parsed || variables);

log('Enviroment Variables:', env);

module.exports = env;
