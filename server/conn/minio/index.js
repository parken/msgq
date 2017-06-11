// /**
//  * Created by Manjesh on 09-08-2016.
//  */
// import fsp from 'fs-promise';
// import Bluebird from 'bluebird';
// import MinioClient from 'minio';
// import config from '../../config/environment';
// import logger from '../../components/logger';
//
// // Todo: Need better structure
// const Minio = new MinioClient(config.MINIO)
// Bluebird.promisifyAll(Object.getPrototypeOf(Minio));
//
// // - Todo: Move to Helpers
// Minio.bufferUpload = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';  // Bucket name always in lowercaseObj
//   return Minio.putObjectAsync(minObj.bucket, minObj.object,
//     minObj.buffer, 'application/octet-stream');
// }
//
// Bluebird.promisifyAll(Object.getPrototypeOf(Minio));
//
// function qualifyBucket(bucketName) {
//   let bucket = bucketName;
//   if (typeof bucket === 'string' && bucket[0] === '/') {
//     bucket = bucket.slice(1);
//   }
//   return bucket.toLowerCase();
// }
//
// Minio.base64Upload = (minioObject) => {
//   const minObj = minioObject;
//   minObj.buffer = Buffer.from(minioObject.base64String, 'base64');
//   return Minio.bufferUpload(minObj);
// }
//
// Minio.base64UploadMulti = (minioObjects) => {
//   return Promise.all(minioObjects.map(m => Minio.base64Upload(m)));
// }
//
// Minio.viewLink = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';   // Bucket name always in lowercaseObj
//   minObj.expires = minObj.expires || 24 * 60 * 60;   // Expired in one day
//   if (!minObj.object) {
//     logger.error('Minio: View File not found', minObj)
//     return Promise.resolve(`${config.PREFIX}api.${config.DOMAIN}/api/404.pdf`);
//   }
//   return Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.object))
//     .then(() => Minio
//       .presignedGetObjectAsync(minObj.bucket, qualifyBucket(minObj.object), minObj.expires))
//     .catch(() => {
//       logger.error('Minio: View File not found', minObj)
//       return `${config.PREFIX}api.${config.DOMAIN}/api/404.pdf`;
//     });
// }
//
// Minio.downloadLinkBase = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';   // Bucket name always in lowercaseObj
//   minObj.expires = minObj.expires || 24 * 60 * 60;   // Expired in one day
//   minObj.headers = {
//     'response-content-disposition':
//       `attachment; filename="${minObj.name.replace(/[^a-zA-Z0-9-_\.]/g, '')}"` };
//   return Minio.presignedGetObjectAsync(
//     minObj.bucket.toLowerCase(), qualifyBucket(minObj.object),
//     minObj.expires, minObj.headers
//   );
// };
//
// Minio.downloadLink = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';   // Bucket name always in lowercase
//   return Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.object))
//     .then(() => Minio.downloadLinkBase(minObj))
//     .catch(() => {
//       logger.error('Minio: File not found', minObj)
//       return `${config.PREFIX}api.${config.DOMAIN}/api/404.pdf`;
//     });
// };
//
// Minio.retryDownloadLink = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';   // Bucket name always in lowercase
//   return Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.object))
//     .then(() => Minio.downloadLinkBase(minObj))
//     .catch(() => {
//       logger.error('Minio: retry', minObj);
//       return Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.retryObject))
//         .then(() => {
//           minObj.object = minObj.retryObject;
//           return Minio.downloadLink(minObj);
//         })
//         .catch(() => {
//           logger.error('Minio: File not found', minObj)
//           return `${config.PREFIX}api.${config.DOMAIN}/api/404.pdf`;
//         });
//     });
// };
//
// Minio.uploadLink = (minioObject) => {
//   const minObj = minioObject;
//   minObj.bucket = minObj.bucket || 'quezx';   // Bucket name always in lowercaseObj
//   minObj.expires = minObj.expires || 24 * 60 * 60;   // Expired in one day
//   return Minio.presignedPostObjectAsync(
//     minObj.bucket, qualifyBucket(minObj.object), minObj.expires);
// };
//
// Minio.uploadTemp = (minioObject) => {
//   const minObj = minioObject;
//   const fileStream = fsp.createReadStream(minioObject.temp)
//   return fsp.stat(minioObject.temp).then(stats => Minio
//     .putObjectAsync('quezx', minObj.object, fileStream, stats.size, 'application/octet-stream'));
// }
//
// export default Minio;
//
