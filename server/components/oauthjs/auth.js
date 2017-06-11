
import oauth from './index';

export default function () {
  return function (reqArgs, res, next) {
    const req = reqArgs;
    return oauth.authorise()(req, res, next);
  };
}
