//
// import config from '../../config/environment';
// import elasticsearch from 'elasticsearch';
//
// const es = new elasticsearch.Client({
//   hosts: [config.ES.HOST],
//   defer() {
//     let resolve;
//     let reject;
//     const promise = new Promise((res, rej) => {
//       resolve = res;
//       reject = rej;
//     });
//
//     return { resolve, reject, promise };
//   },
// });
//
// module.exports = es;
