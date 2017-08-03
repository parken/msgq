const create = require('s3-website').s3site;
var AWS = require('aws-sdk')
import FileStructure from '../fileStructure';
import db from  '../../conn/sqldb'
var config = {
  region: 'eu-central-1',
  domain: 'test4.g91.co',
  routes: [{
    Condition: {
      KeyPrefixEquals: 'foo/'
    },
    Redirect: {
      HostName: 'example.com'
    }
  }]
}

export function generate() {
  db.User.find(user => fs.writeFileSync(`${config.root}/temp/`))
}

export function register () {
  return new Promise((res, rej) => create(config, (err, website) => {
    if (err) return rej(err);
    var s3 = new AWS.S3({ region: config.region })

    // check if website works
    s3.putObject({
      Bucket: config.domain,
      Key: 'index.html',
      ACL: 'public-read',
      Body: '<h1>Foo</h1>',
      ContentType: 'text/html'
    }, function (err) { console.log('permission givein')
      return res(website);
    });
  }));
}

export function deploy (options) {
  return new Promise((res, rej) => create(Object.assign(options, {
    region: 'eu-central-1', // optional, default: us-east-1
    index: 'index.html',
    error: 'index.html',
    uploadDir: '/home/yog27ray/parken/hosting/test.w91.co',
    deploy: true,
  }), (err, website) => {
    if (err) return rej(err);
    return res(website);
  }));
}

export function generateWebsite(domain, option) {
  return FileStructure.writeFile(`/websites/${domain}/index.html`, option);
}

register().then(x => {
  console.log('registration success', x);
  return deploy({ domain: 'test2.w91.co' })
    .then(x => console.log('s', x))
    .catch(err => console.log('e', err));
})

export default {
  generate,
  register,
  deploy,
  generateWebsite,
};
