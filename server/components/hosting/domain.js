
import rp from 'request-promise';
import { RESELLER_ID, RESELLER_API_KEY, DO_TOKEN } from '../../config/environment';
const apiurl = 'https://httpapi.com';
const resellerid = RESELLER_ID;
const apikey = RESELLER_API_KEY;

let cache = {};

export function searchDomains(q) {
  return rp({
    method: 'GET',
    uri: `${apiurl}/api/domains/available.json`,
    query: {
      'auth-userid': resellerid,
      'api-key': apikey,
      'domain-name': q,
      tlds: 'com',
    },
    json: true,
  }).then(domainsMap => Object
    .keys(domainsMap)
    .map(key => Object
      .assign({
        name: key,
        price: cache.customerPrice[domainsMap[key].classkey].addnewdomain[1],
      }, domainsMap[key])));
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
      ns: ['ns1.digitalocean.com', 'ns2.digitalocean.com'],
      'customer-id': '382718速-contact-id=2558879',
      'admin-contact-id': '17420190', // yog27ray
      'tech-contact-id': '17420190', // yog27ray
      'billing-contact-id': '17420190', // yog27ray
      'invoice-option': 'KeepInvoice',
      'protect-privacy': false,
    },
    json: true,
  });
}

// need to whitelist ip from https://manage.resellerclub.com/
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

export function deleteCname(domain) {
  // https://api.digitalocean.com/v2/domains/example.com/records/3352896
  // need to store id when cname created, then only deletion possible
  return Promise.resolve();
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
      priority: null,
      port: null,
      ttl: 1800,
      weight: null,
    },
    headers: {
      Authorization: `Bearer ${DO_TOKEN}`,
    },
    json: true,
  });
}

export default {
  searchDomains,
  register,
  customerPrice,
  reset,
  createCNAME,
};
