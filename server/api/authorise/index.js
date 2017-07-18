const express = require('express');
const controller = require('./authorise.controller');

const router = express.Router();

router.get('/', (r, res, next) => {
  const req = r;
  if (req.query.redirect_uri === 'http://localhost:3017/api/auth/callback') {
    req.query.redirect_uri = 'http://127.0.0.1:3017/api/auth/callback';
  }

  return next();
}, controller.index);

router.post('/', (r, res, next) => {
  const req = r;
  if (req.body.redirect_uri === 'http://localhost:3017/api/auth/callback') {
    req.body.redirect_uri = 'http://127.0.0.1:3017/api/auth/callback';
  }

  return next();
}, () => {});

module.exports = router;
