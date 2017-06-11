
import Sequelize from 'sequelize';

import config from '../../config/environment';

const db = {
  Sequelize,
  sequelize: Sequelize,
  sequelizeAy: new Sequelize(
    config.MYSQL.database, config.MYSQL.username,
    config.MYSQL.password, config.MYSQL
  ),
};

db.User = db.sequelizeAy.import('../../api/user/user.model');
db.RefreshToken = db.sequelizeAy.import('./oauth/refreshToken.model');
db.AccessToken = db.sequelizeAy.import('./oauth/accessToken.model');
db.App = db.sequelizeAy.import('./oauth/app.model');
db.AuthCode = db.sequelizeAy.import('./oauth/authCode.model');
db.Session = db.sequelizeAy.import('../../api/session/session.model');

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
