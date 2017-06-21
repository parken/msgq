import request from 'request';
import config from '../../config/environment';
import logger from '../../components/logger';
import { sms, slack } from '../../components/notify';
import oAuthModel from '../../components/oauth/model';

import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  console.log(err)
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function wStates(req, res) {
  return db.WState
    .findAll({attributes: ['id', 'name'], raw: true})
    .then(wS => res.json(wS))
    .catch(err => handleError(res, 500, err));
}

export function me(req, res) {
  return db.User
    .findById(req.user.id, {
      attributes: ['mobile', 'email', 'name', 'id', 'groupId', 'admin'],
      raw: 'true',
    })
    .then(u => res.json(u))
    .catch(err => handleError(res, 500, err));
}


export function index(req, res) {
  return db.User
    .findAll()
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

export function show(req, res) {
  return db.User
    .find({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'email', 'mobile'],
    })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

export function showUuid(req, res) {
  return db.LoginIdentifier
    .find({
      where: { uuid: req.params.uuid },
      attributes: ['id'],
      include: [{
        model: db.User,
        attributes: ['id', 'mobile', 'otp'],
        required: true,
      }],
    })
    .then((loginIdentifier) => {
      if (!loginIdentifier) return res.status(404).json({ message: 'Invalid Request' })
      return res.json(loginIdentifier.User);
    })
    .catch(err => handleError(res, 500, err));
}

export function create(req, res) {
  const user = req.body;
  if (`${user.mobile}`.length === 10) user.mobile += 910000000000;
  if (`${user.supportMobile}`.length === 10) user.supportMobile += 910000000000;
  user.groupId = 2;
  user.createdBy = req.user.id;
  return db.User
    .create(user)
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

export function signup(req, res) {
  const { id, name, password, otp, email } = req.body;
  db.User.find({
    attributes: ['id'],
    where: { id, otp },
  })
    .then((u) => {
      if (!u) return res.status(400).json({ error_description: 'Invalid OTP' });
      u
        .update({ otpStatus: 0, name, password, email })
        .catch(err => logger.error('user.ctrl/otpVerify', err));
      slack(`Signup: ${u.id}, ${u.name}, ${u.mobile}, ${u.email}`);
      return res.status(201).end();
    }).catch(err => handleError(res, 500, err));
}

function getApp(code) {
  return db.AuthCode.find({ where: { auth_code: code }, include: [db.App] })
    .then(authCode => authCode.App.toJSON());
}

export function login(req, res) {
  const { code } = req.body;
  return (code
    ? getApp(code)
    : db.App.findById(1, { raw: true }))
    .then(app => {
      const options = {
        url: `${config.OAUTH_SERVER}${config.OAUTH_ENDPOINT}`,
        auth: {
          user: app.clientId,
          pass: app.clientSecret,
        },
        headers: {
          'user-agent': req.headers['user-agent'],
          'x-forwarded-for': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        },
      };

      options.form = code
        ? { grant_type: 'authorization_code', redirect_uri: `${app.redirectUri}`, code }
        : { grant_type: 'password', username: req.body.username, password: req.body.password };

      request.post(options, (err, apires, body) => {
        if (err) return res.status(500).json({ err, body });
        return res.status(apires.statusCode).send(body);
      });
    });
}

export function refresh(req, res) {
  return db.App
    .find({
      include: [{
        model: db.RefreshToken,
        where: { refreshToken: req.body.refresh_token },
        required: true,
      }],
    })
    .then(app => {
      if (!app) return res.status(400).json({ message: 'Invalid Token' });
      const options = {
        url: `${config.OAUTH_SERVER}${config.OAUTH_ENDPOINT}`,
        auth: {
          user: app.clientId,
          pass: app.clientSecret,
        },
        form: {
          grant_type: 'refresh_token',
          refresh_token: req.body.refreshToken,
        },
        headers: {
          'user-agent': req.headers['user-agent'],
          'x-forwarded-for': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        },
      };
      return request
        .post(options, (err, apires, body) => {
          if (err) return res.status(500).send(err);
          return res.status(apires.statusCode).send(body);
        });
    });
}

export function logout(req, res, next) {
  return oAuthModel
    .revokeToken(req.body.access_token)
    .then(up => res.status(200).json(up))
    .catch(next);
}

export function duplicate(req, res) {
  const mobile = `91${req.query.mobile}`;
  return db.User
    .count({ where: { mobile } })
    .then(data => res.json({ mobile: !!data }))
    .catch(err => handleError(res, 500, err));
}

export function update(req, res) {
  const id = req.user.id || req.params.id;
  const user = req.body;
  delete user.id;
  if (req.user.id) {
    delete user.alternateMobile;
  }
  return db.User
    .update(user, {
      where: {
        id,
      },
    })
    .then(() => res.json({id}))
    .catch(err => handleError(res, 500, err));
}

// Check email and phone exists
export function checkExists(req, res) {
  return db.User
    .checkExists(db, req.query.email, req.query.mobile)
    .then(status => res.json(status))
    .catch(err => handleError(res, 500, err));
}

export function otpLogin(req, res) {
  return db.User
    .findOrCreate({
      where: {
        mobile: req.body.username || req.body.mobile,
      },
      attributes: ['id', 'otpStatus', 'otp', 'mobile'],
    }).then(([user, newUser]) => {
      if (!user) {
        return res.status(400).json({
          message: 'User Details not matching with our records. Please contact support'
        });
      }

      const otp = user.otpStatus === 1 && user.otp
        ? user.otp
        : Math.floor(Math.random() * 90000) + 10000;

      const text = `${otp} is your OTP. Treat this as confidential. Sharing it with anyone gives` +
        'them full access to your account. We never call you to verify OTP.';
      if (user.mobile) sms({to: user.mobile, text});
      db.User
        .update({otp, otpStatus: 1}, {where: {id: user.id}})
        .catch(err => logger.error('user.ctrl/otp', err));
      return res.json({message: 'success', id: user.id, newUser});
    }).catch(err => handleError(res, 500, err));
}

export function otpSend(req, res) {
  db.User.find({
    where: {
      $or: {
        email: req.body.username,
        mobile: req.body.username,
      },
    },
    attributes: ['id', 'otpStatus', 'otp', 'mobile'],
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: 'User Details not matching with our records. Please contact support'
      });
    }

    const otp = user.otpStatus === 1 && user.otp
      ? user.otp
      : Math.floor(Math.random() * 90000) + 10000;

    const text = `${otp} is your OTP. Treat this as confidential. Sharing it with anyone gives` +
      'them full access to your account. We never call you to verify OTP.';
    if (user.mobile) sms({to: user.mobile, text});
    db.User
      .update({otp, otpStatus: 1}, {where: {id: user.id}})
      .catch(err => logger.error('user.ctrl/otp', err));
    return res.json({message: 'success', id: user.id});
  }).catch(err => handleError(res, 500, err));
}

export function otpVerify(req, res) {
  db.User.find({
    attributes: ['id'],
    where: {
      $or: [{ id: req.body.id }, { mobile: req.body.mobile }],
      otp: req.body.otp,
    },
  })
    .then((user) => {
      if (!user) return res.status(400).json({error_description: 'Invalid OTP'});
      user
        .update({otpStatus: 0})
        .catch(err => logger.error('user.ctrl/otpVerify', err));
      return res.json({message: 'success', id: user.id});
    }).catch(err => handleError(res, 500, err));
}


// Creates a new User in the DB
export function passwordChange(req, res) {
  return db.User.find({
    where: {
      id: req.body.id,
      otp: req.body.otp,
    },
    attributes: ['id', 'mobile', 'email', 'name'],
  }).then(u => {
    if (!u) {
      return res
        .status(400)
        .json({error: 'Invalid password', error_description: 'Invalid current password'});
    }

    return u.update({password: req.body.password})
      .then(() => {
        res.status(204).end();
        u.revokeTokens(db); // revoke all
        const {id, name, mobile, email} = u;
        return slack(`Password change: ${id}, ${name}, ${mobile}, ${email}`);
      });
  })
    .catch(err => handleError(res, 500, err));
}

export function sendLogin(req, res) {
  return db.User
    .find({ where: { id: req.params.id } })
    .then(user => {
      if (!user) return res.status(404).end();
      const otp = user.otpStatus === 1 && user.otp
        ? user.otp
        : Math.floor(Math.random() * 90000) + 10000;

      const text = `Your account has been created click on the link to login ${
        req.origin}/home?otp=${otp}&id=${user.mobile}`;

      if (user.mobile) sms({to: user.mobile, text});
      db.User
        .update({otp, otpStatus: 1}, {where: {id: user.id}})
        .catch(err => logger.error('user.ctrl/otp', err));
      return res.json({message: 'success', id: user.id});
    })
    .catch(err => handleError(res, 500, err));
}

export function loginUid(req, res) {
  return res.status(500).json({});
}
