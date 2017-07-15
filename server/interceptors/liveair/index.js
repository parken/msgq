const express = require('express');
import * as interceptor from './liveair.interceptor';
console.log(interceptor);

const router = express.Router();

const routeCheck = (provider, routes) => {
  return (req, res, next) => {
    const type = req.get('type');
    if (type && type === provider) return routes(req, res, next);

    // skiping provider and moving to msgque routes
    next();
  };
}

router.get('/routes', routeCheck('liveair', interceptor.routes));

module.exports = router;
