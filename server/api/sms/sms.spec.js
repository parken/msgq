
/* globals sinon, describe, expect, it */
'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var smsCtrlStub = {
  show: 'smsCtrl.show',
  create: 'smsCtrl.create',
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy(),
};

// require the index with our stubbed out modules
var smsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sms.controller': smsCtrlStub
});

describe('SMS API Router:', function() {
  it('should return an express router instance', function() {
    expect(smsIndex).to.equal(routerStub);
  });


  describe('POST /api/sms', function() {
    it('should route to sms.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'smsCtrl.create')
      ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sms/:id', function() {
    it('should route to sms.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'smsCtrl.show')
      ).to.have.been.calledOnce;
    });
  });

});
