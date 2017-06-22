
import _ from 'lodash';
import crypto from 'crypto';

import { db } from '../../config/environment';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    parent_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    acl_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    token: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    enable_webservices: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    webservices_ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    mobile: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    sender: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    footer: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    country: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    zipcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    adhoc_credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    datetime_timezone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    language_module: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    fwd_to_mobile: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    fwd_to_email: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    fwd_to_inbox: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    replace_zero: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ''
    },
    plus_sign_remove: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    plus_sign_add: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    send_as_unicode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    local_length: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '9'
    },
    register_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    lastupdate_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    flag_deleted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    groupId: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    otpStatus: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    admin: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    supportName: DataTypes.STRING,
    supportMobile: DataTypes.STRING,
    supportEmail: DataTypes.STRING,
    loginUrl: DataTypes.STRING,
    slackUrl: DataTypes.STRING,
    slackActive: DataTypes.BOOLEAN,
    smsActive: DataTypes.BOOLEAN,
  }, {
    tableName: `${db}_tblUser`,
    timestamps: true,
    createdAt: 'register_datetime',
    updatedAt: 'lastupdate_datetime',
    defaultScope: {
      where: { flag_deleted: 1 },
    },
    instanceMethods: {
      verifyPasswordAsync(password) {
        const hashedPass = crypto
          .createHash('md5')
          .update(password)
          .digest('hex');
        return (hashedPass === this.password) ? Promise.resolve(_.pick(this.toJSON(), ['id']))
          : Promise.reject({ code: 400, message: 'Check password!' });
      },
      verifyPassword(password, cb) {
        return (this.hashPassword(password) === this.password) ?
          cb(null, this.toJSON()) : cb(null, false);
      },

      revokeTokens(db) {
        const expires = new Date();
        return Promise.all([
          db.AccessToken.update(
            { expires },
            { where: { userId: this.id } }
          ),
          db.RefreshToken.update(
            { expires },
            { where: { userId: this.id } }
          ),
        ]);
      },

      hashPassword(password) {
        return crypto
          .createHash('md5')
          .update(password)
          .digest('hex');
      },
    },

    classMethods: {
      associate(db) {
        User.belongsTo(db.Group, {
          foreignKey: 'groupId',
        });
        User.belongsTo(User, {
          foreignKey: 'createdBy',
          allowNull: true,
        });
      },
      checkEmailExists(db, email) {
        return db.User.count({ where: { email } }).then(rows => {
          if (rows > 0) return Promise.resolve(true);
          return Promise.resolve(false);
        });
      },
      checkMobileExists(db, mobile) {
        return db.User.count({ where: { mobile } }).then(rows => {
          if (rows > 0) return Promise.resolve(true);
          return Promise.resolve(false);
        });
      },
      checkExists(db, email, mobile) {
        return Promise.all([
          email ? db.User.checkEmailExists(db, email) : Promise.resolve(false),
          mobile ? db.User.checkMobileExists(db, mobile) : Promise.resolve(false),
        ])
          .then(([e, m]) => ({ email: e, mobile: m }));
      },
    },
    hooks: {
      beforeCreate(instance) {
        if (instance.changed('password')) {
          instance
            .set('password', instance.hashPassword(instance.password));
        }
      },

      beforeUpdate(instance) {
        if (instance.changed('password')) {
          instance
            .set('password', instance.hashPassword(instance.password));
        }
      },
    },
  });

  return User;
}
