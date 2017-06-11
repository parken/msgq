// /**
//  * Created by ampy on 9/8/16.
//  */
//
// import solrClient from 'solr-client';
// import config from '../../config/environment';
// import Bluebird from 'bluebird';
//
// const solrConnections = {
//   solr: solrClient.createClient(
//     config.solr.host, config.solr.port,
//     config.solr.core, config.solr.path
//   ),
// };
//
// Bluebird.promisifyAll(Object.getPrototypeOf(solrConnections.solr));
//
// module.exports = solrConnections;
