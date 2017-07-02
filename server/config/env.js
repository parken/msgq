import fs from 'fs';
import path from 'path';
import debug from 'debug';
import dotenv from 'dotenv';

const log = debug('config/env');
const root = path.normalize(__dirname + '/../..');
const envFile = path.join(root, '.env');
const setupCompleted = fs.existsSync(envFile);
const variables = setupCompleted ? dotenv.config({ path: envFile }) : {};
const env = Object.assign({ setupCompleted, envFile, root }, variables.parsed || variables);

log('Enviroment Variables:', env);

module.exports = env;
