
// get domains list
// purchase
// payment gateway
// set dns server & set cname
// check dns

const ownDomains = ["w91.co","u91.co","s91.co","q91.co","r91.co","o91.co","x91.co","d91.co","e91.co","f91.co","c91.co","j91.co","l91.co","n91.co","z91.co","y91.co","m91.co","h91.co","k91.co","g91.co"];
const apiurl = 'https://httpapi.com';
const resellerid = 495850;
const apikey = '4p6oDOv7VdComFiXpRcOSx38c2qR2cGI';
const { customerPriceMap } = require('./cache');

export function searchDomains(q) {
  return rp({
    method: 'GET',
    uri: `${apiurl}/api/domains/available.json`,
    query: {
      'auth-userid': resellerid,
      'api-key': apikey,
      'domain-name': q,
      'tlds': 'com',
    },
    json: true,
  }).then((domainsMap) => Object.keys(domainsMap).map(key => {
    return Object.assign({
      name: key,
      price: customerPrice[domainsMap[key].classkey].addnewdomain[1]
    }, domainsMap[key])
  }));
}

export function register(domain){
  if (domain.endsWith('91.co')) return Promise.resolve({ message: 'registration success' });

  // if not 91.co register from resellerclub
  return rp({
    method: 'POST',
    uri: `${apiurl}/api/domains/api/domains/register.json`,
    body: {
      'auth-userid': resellerid,
      'api-key': apikey,
      'domain-name': domain,
      years: '1',
      ns: [ 'ns1.digitalocean.com', 'ns2.digitalocean.com' ],
      'customer-id': '382718速-contact-id=2558879',
      'admin-contact-id': '17420190', // yog27ray
      'tech-contact-id': '17420190', // yog27ray
      'billing-contact-id': '17420190', // yog27ray
      'invoice-option': 'KeepInvoice',
      'protect-privacy': false,
    },
    json: true,
  })
}

// need to whitelist ip from
// https://manage.resellerclub.com/ ->
// // call for password

let cache = {};

export function customerPrice() {
  if (cache.customerPrice) return cache.customerPrice;
  return rp({
    method: 'GET',
    uri: `${apiurl}/api/products/customer-price.json`,
    query: {
      'auth-userid': resellerid,
      'api-key': apikey,
    },
    json: true,
  }).then((data) => {
    cache.customerPrice = data;
    return data;
  });
}

export function reset() {
  cache = {};
}

// call for password
export function createCNAME(domain = 'w91.co', {
  name = 'yog27ray',
  // url got from
  data = 'yog27ray.w91.co.s3-website.ap-south-1.amazonaws.com',
}) {
  return rp({
    method: 'POST',
    uri: `https://api.digitalocean.com/v2/domains/${domain}/records`,
    body: {
      type: 'CNAME',
      name,
      data,
      "priority":null,
      "port":null,"ttl":1800,"weight":null},
    headers: {
      Authorization: 'Bearer 81c0dec527caec248c17fd6929dd0d8f9e8fb9cfc6752a525975eaa235c31c8a'
    },
    json: true,
  })
}


