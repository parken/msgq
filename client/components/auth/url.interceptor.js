/* @ngInject */
function UrlInterceptor(Session, urls, $rootScope) {
  return {
    request(config) {
      const conf = config;
      const secure = config.url[0] === '~';
      // handle url request without domain to api server
      if (['/', '~'].includes(conf.url[0])) {
        conf.url = `${urls.API_SERVER}/api${secure ? conf.url.substr(1) : conf.url}`;
      }

      return conf;
    },
  };
}

export default UrlInterceptor;
