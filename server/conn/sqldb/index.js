import _ from 'lodash';
import Sequelize from 'sequelize';
import config from '../../config/environment';
import oauthComponent from '../../components/oauth/sequelize';

const { MYSQL_DB, MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_TZ } = config;

const db = {
  sequelize: new Sequelize(
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PASS,
    { host: MYSQL_HOST,
      dialect: 'mysql',
      timezone: MYSQL_TZ,
      seederStorage: 'sequelize',
      supportBigNumbers: true,
    }
  ),
};

db.User = db.sequelize.import('../../api/user/user.model');
db.RefreshToken = db.sequelize.import('../../components/oauth/sequelize/refreshToken.model');
db.AccessToken = db.sequelize.import('../../components/oauth/sequelize/accessToken.model');
db.App = db.sequelize.import('../../components/oauth/sequelize/app.model');
db.AuthCode = db.sequelize.import('../../components/oauth/sequelize/authCode.model');
db.Session = db.sequelize.import('../../components/oauth/sequelize/session.model');

[
  'Group', 'SenderIdStatus', 'SenderId', 'Route', 'Upstream', 'LoginIdentifier', 'Contact',
  'MessageStatus', 'Message', 'PackageType', 'UserPackage', 'Transaction', 'PriorityNumber',
  'Group', 'GroupContact', 'Campaign', 'Template', 'MessageFly', 'Selling', 'Sending',
  'TransactionStatus', 'UpstreamPlan', 'GroupEmail', 'Role', 'DomainType', 'Domain',
].forEach(model =>
  (db[model] = db.sequelize.import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`)));

oauthComponent(db);

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

export default db;
