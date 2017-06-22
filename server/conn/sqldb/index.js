import _ from 'lodash';
import Sequelize from 'sequelize';
import config from '../../config/environment';
import oauthComponent from '../../components/oauth/sequelize';

const { db: { type, host, port, user, pass, name, tz } } = config;

const db = {
  sequelize: new Sequelize(
    name, user,
    pass, { host, dialect: type, timezone: tz }
  ),
};

db.User = db.sequelize.import('../../api/user/user.model');
db.RefreshToken = db.sequelize.import('../../components/oauth/sequelize/refreshToken.model');
db.AccessToken = db.sequelize.import('../../components/oauth/sequelize/accessToken.model');
db.App = db.sequelize.import('../../components/oauth/sequelize/app.model');
db.AuthCode = db.sequelize.import('../../components/oauth/sequelize/authCode.model');
db.Session = db.sequelize.import('../../components/oauth/sequelize/session.model');

[
  'Group', 'SenderId', 'SmsType', 'Upstream', 'LoginIdentifier',
].forEach(model =>
  (db[model] = db.sequelize.import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`)));

oauthComponent(db);

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

export default db;
