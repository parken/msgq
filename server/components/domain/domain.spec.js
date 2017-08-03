
const domain = require('./index');
const s3 = require('./hosting');

domain
  .searchDomains('yog27ray')
  .then((domains) => {
    // user selected yog27ray.w91.co
    const userSelection = 'yog27ray.w91.co';
    // POST /domains { name: 'yog27ray.w91.co' }
    const ourTLD = userSelection.endsWith('91.co');
    return Promise
      .all([
        domain
          .register(userSelection),
        s3.generateWebsite(userSelection)
          .then(() => s3.register(userSelection),
      ]).then([domainReg, s3site]) => {
      return Promise.all([
        domain
          .createCNAME(ourTLD ? userSelection.slice(-5) : userSelection, { name: ourTLD ? userSelection.split('.').shift(), data: s3site.url } ),
        s3.deploy(userSelection),
      ]);
    });

    // verify all working for not
  })
