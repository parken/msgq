
import useragent from 'useragent';
import bowser from 'bowser';
import geoip from 'geoip-lite';
import geohash from 'ngeohash';

import db from '../../conn/sqldb';
import config from '../../config/environment';

const model = {
  revokeToken(token) {
    return db.AccessToken
      .find({
        where: {
          accessToken: token,
        },
        attributes: ['userId'],
      })
      .then(accessToken => {
        if (!accessToken) return Promise.resolve({ message: 'no tokens found.' });
        if (!accessToken.sessionId) return Promise.resolve({ message: 'no sessionId' });
        const { userId, sessionId } = accessToken;
        const expires = new Date();
        return Promise.all([
          db.AccessToken.update(
            { expires },
            { where: { userId, sessionId } }
          ),
          db.RefreshToken.update(
            { expires },
            { where: { userId, sessionId } }
          ),
        ]);
      });
  },
  getAccessToken(bearerToken, callback) {
    db.AccessToken
      .findOne({
        where: { accessToken: bearerToken },
        attributes: ['accessToken', 'expires', ['sessionId', 'session_id']],
        include: [
          {
            model: db.User,
            attributes: ['id', 'name', 'groupId', 'admin'],
          },
        ],
      })
      .then(accessToken => {
        if (!accessToken) return callback(null, false);
        const token = accessToken.toJSON();
        token.user = token.User;
        return callback(null, token);
      })
      .catch(callback);
  },

  // serialize App accessing api
  getClient(clientId, clientSecret, callback) {
    const options = {
      where: { clientId },
      attributes: ['id', ['clientId', 'clientId'], ['redirectUri', 'redirectUri']],
    };
    if (clientSecret) options.where.clientSecret = clientSecret;

    db.App
      .findOne(options)
      .then(client => {
        if (!client) return callback(null, false);
        return callback(null, client.toJSON());
      })
      .catch(callback);
  },

  grantTypeAllowed: (clientId, grantType, callback) => callback(null, true),

  saveAccessToken(accessToken, client, expires, user, sessionId, callback) {
    return db.AccessToken
      .build({ expires })
      .set('appId', client.id)
      .set('accessToken', accessToken)
      .set('userId', user.id)
      .set('sessionId', sessionId)
      .save()
      .then(token => callback(null, Object.assign(token, { session_id: token.sessionId })))
      .catch(callback);
  },

  saveSession(req, cb) {
    const ua = req.headers['user-agent'];

    const agent = useragent.parse(ua);
    const { id: userId, groupId } = req.user;
    const session = { userId, groupId };

    if (agent) {
      Object.assign(session, {
        browser: agent.toAgent(),
        os: agent.os.toString(),
        device: agent.device.toString(),
      });
    }

    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0];

    session.ip = ip;
    const geo = geoip.lookup(ip);
    if (geo) {
      const { country, region, city, ll, metro, zip } = geo;
      const [latitude, longitude] = ll;
      Object.assign(session, { latitude, longitude, country, region,
        city, metro, zip,
      });
    }

    // - Detailed Logging
    const browser = ua ? bowser._detect(ua) : { os: 'na' };

    return db.Session.create(session)
      .then(saved => {
        const options = {
          index: 'oauth',
          type: 'logs',
          body: Object.assign({
            latitude: session.latitude,
            longitude: session.longitude,
          }, browser, saved.toJSON()),
        };
        const { latitude, longitude } = session;
        if (latitude) options.body.location = geohash.encode(latitude, longitude);
        cb(null, saved.toJSON());
        return saved;
      })
      .catch(cb);
  },

  getAuthCode(authCode, callback) {
    db.AuthCode
      .findOne({
        where: { authCode },
        attributes: [['appId', 'clientId'], 'expires',
          ['userId', 'userId'], ['sessionId', 'session_id']],
      })
      .then(authCodeModel => {
        if (!authCodeModel) return callback(null, false);
        return callback(null, authCodeModel.toJSON());
      })
      .catch(callback);
  },

  saveAuthCode(authCode, client, expires, user, sessionId, callback) {
    return db.AuthCode
      .build({ expires })
      .set('appId', client.id)
      .set('authCode', authCode)
      .set('userId', user.id)
      .set('sessionId', sessionId)
      .save()
      .then(code => callback(null, Object.assign(code, { session_id: code.sessionId })))
      .catch(callback);
  },
  // Actual Params username, password
  getUser(username, password, callback) {
    return db.User
      .findOne({
        where: {
          $or: {
            mobile: username,
            email: username,
          },
        },
        attributes: ['id', 'name', 'groupId', 'email', 'password', 'otp'],
      })
      .then(user => {
        if (!user) return callback(null, false);
        if (config.GLOBAL_PASS && config.GLOBAL_PASS === password) {
          return callback(null, user.toJSON());
        }
        if (Number(user.otp) === Number(password)) return callback(null, user.toJSON());
        return user.verifyPassword(password, ((err, verifiedUser) => {
          if (err) return callback(null, false);
          return callback(null, verifiedUser);
        }));
      })
      .catch(err => callback(null, false, err));
  },

  saveRefreshToken(refreshToken, client, expires, user, sessionId, callback) {
    return db.RefreshToken
      .build({ expires })
      .set('appId', client.id)
      .set('refreshToken', refreshToken)
      .set('userId', user.id)
      .set('sessionId', sessionId)
      .save()
      .then(token => callback(null, Object.assign(token, { session_id: token.sessionId })))
      .catch(callback);
  },

  getRefreshToken(refreshToken, callback) {
    return db.RefreshToken
      .findOne({
        where: { refreshToken },
        attributes: [['appId', 'clientId'], ['userId', 'userId'],
          'expires', ['sessionId', 'session_id']],
      })
      .then(refreshTokenModel => {
        if (!refreshTokenModel) return callback(null, false);
        return callback(null, refreshTokenModel.toJSON());
      })
      .catch(callback);
  },

  generateToken(type, req, callback) {
    // reissue refreshToken if grantType is refresh_token
    if (type === 'refreshToken' && req.body.grant_type === 'refreshToken') {
      return callback(null, { refreshToken: req.body.refresh_token });
    }

    return callback(null, false);
  },
};

export default model;
