
/* globals sinon, describe, expect, it */


const proxyquire = require('proxyquire').noPreserveCache();

const smsCtrlStub = {
  show: 'smsCtrl.show',
  create: 'smsCtrl.create',
};

const routerStub = {
  get: sinon.spy(),
  post: sinon.spy(),
};

// require the index with our stubbed out modules
const smsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    },
  },
  './sms.controller': smsCtrlStub,
});

describe('SMS API Router:', () => {
  it('should return an express router instance', () => {
    expect(smsIndex).to.equal(routerStub);
  });


  describe('POST /api/sms', () => {
    it('should route to sms.controller.create', () => {
      expect(routerStub.post
        .withArgs('/', 'smsCtrl.create'),
      ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sms/:id', () => {
    it('should route to sms.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'smsCtrl.show'),
      ).to.have.been.calledOnce;
    });
  });
});
