import s3website from 's3-website';
import AWS from 'aws-sdk';
import FileStructure from '../fileStructure';
import logger from '../../components/logger';
import { root, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../config/environment';

export function register(domain) {
  const config = {
    region: 'eu-central-1',
    domain,
  }

  return new Promise((res, rej) => s3website.s3site(config, (err, website) => {
    if (err) return rej(err);
    return res(website);
  }));
}

export function deploy(domain) {
  const options = { domain };
  return new Promise((res, rej) => s3website.s3site(Object.assign(options, {
    region: 'eu-central-1', // optional, default: us-east-1
    index: 'index.html',
    error: 'index.html',
    uploadDir: `${root}/websites/${domain}`,
    deploy: true,
  }), (err, website) => {
    if (err) return rej(err);
    const s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: 'eu-central-1',
    });
    // check if website works
    return s3.putObject({
      Bucket: domain,
      Key: 'index.html',
      ACL: 'public-read',
      Body: `<h1>${domain}</h1>`,
      ContentType: 'text/html',
    }, error => {
      logger.error('s3.putObject', website, error);
      return res(website);
    });
  }));
}

export function generateWebsite(domain, option) {
  return FileStructure.writeFile(`/websites/${domain}/index.html`, option);
}

function deleteDomain (domain) {
  const s3 = new AWS.S3({
    region: 'eu-central-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  })

  return new Promise((res, rej) => s3.deleteObjects({
    Bucket: domain,
    Delete: {
      Objects: [{ Key: 'index.html' }],
    },
  }, err => {
    if (err) return rej(err);
    s3.deleteBucket({ Bucket: domain }, (error, data) => {
      if (err) return rej(error);
      return res(data);
    });
  }));
}

export default {
  register,
  deploy,
  generateWebsite,
  deleteDomain,
};
