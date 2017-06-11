
import _ from 'lodash';
import Sequelize from 'sequelize';
import config from '../../config/environment';
import oauthComponent from '../../components/oauth/sequelize';

const { MYSQL_DB, MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_TZ } = config;

const db = {
  sequelize:  new Sequelize(
    MYSQL_DB, MYSQL_USER,
    MYSQL_PASS, { host: MYSQL_HOST, dialect: 'mysql', timezone: MYSQL_TZ }
  ),
};

['User', 'Group'].forEach(model => (db[model] = db.sequelize
  .import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`)));

oauthComponent(db);

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

export default db;
