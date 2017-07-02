'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import constants from '../../config/constants';
const { sms_types, routes } = constants;
const { PLAIN, UNICODE } = sms_types;
const { PROMOTIONAL, TRASACTIONAL, SENDER_ID, OTP } = routes;

import request from 'supertest';

var newSMS;

describe('SMS API:', function() {

  describe('POST /api/sms promotionalSMS', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sms')
        .send({
          route_id: PROMOTIONAL,
          mobile_numbers: [9844717202],
          message: 'This is the brand new message!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSMS = res.body;
          done();
        });
    });

    it('should respond with the newly created sms', function() {
      expect(newSMS.id).to.equal(1);
    });
  });

  describe('GET /api/sms/:id', function() {
    var sms;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sms/${newSMS.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sms = res.body;
          done();
        });
    });

    afterEach(function() {
      sms = {};
    });

    it('should respond with the requested sms', function() {
      expect(newSMS.id).to.equal(sms.id);
    });
  });
});
