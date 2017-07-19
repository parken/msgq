
import _ from 'lodash';
import crypto from 'crypto';

const salt = 'DYhG93b0fIxfs2guVoUubasdfajfkljasdjfaklsdjflakrfWwvniR2G0FgaC9mi';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    email: DataTypes.STRING,
    otp: DataTypes.STRING,
    otpStatus: DataTypes.INTEGER,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    admin: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    supportName: DataTypes.STRING,
    supportMobile: DataTypes.BIGINT,
    supportEmail: DataTypes.STRING,
    loginUrl: DataTypes.STRING,
    slackUrl: DataTypes.STRING,
    slackActive: DataTypes.BOOLEAN,
    smsActive: DataTypes.BOOLEAN,
    transactionalStartFrom: DataTypes.INTEGER,
    transactionalPercent: DataTypes.INTEGER,
    promotionalStartFrom: DataTypes.INTEGER,
    promotionalPercent: DataTypes.INTEGER,
    otpStartFrom: DataTypes.INTEGER,
    otpPercent: DataTypes.INTEGER,
    senderIdStartFrom: DataTypes.INTEGER,
    senderIdPercent: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE,
    sellingBalanceTransactional: DataTypes.INTEGER,
    sendingBalanceTransactional: DataTypes.INTEGER,
    sellingBalancePromotional: DataTypes.INTEGER,
    sendingBalancePromotional: DataTypes.INTEGER,
    sellingBalanceSenderId: DataTypes.INTEGER,
    sendingBalanceSenderId: DataTypes.INTEGER,
    sellingBalanceOTP: DataTypes.INTEGER,
    sendingBalanceOTP: DataTypes.INTEGER,
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    instanceMethods: {
      verifyPasswordAsync(password) {
        const hashedPass = crypto
          .createHash('md5')
          .update(salt + password)
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
            { where: { userId: this.id } }),
          db.RefreshToken.update(
            { expires },
            { where: { userId: this.id } }),
        ]);
      },

      hashPassword(password) {
        return crypto
          .createHash('md5')
          .update(salt + password)
          .digest('hex');
      },
    },

    classMethods: {
      associate(db) {
        User.belongsTo(db.Group, {
          foreignKey: 'roleId',
        });
        User.belongsTo(User, {
          foreignKey: 'createdBy',
          allowNull: true,
          as: 'CreatedBy',
        });
        User.belongsTo(User, {
          foreignKey: 'resellerId',
          allowNull: true,
          as: 'ResellerId',
        });
      },
      checkEmailExists(db, email) {
        return db.User.count({ where: { email } }).then((rows) => {
          if (rows > 0) return Promise.resolve(true);
          return Promise.resolve(false);
        });
      },
      checkMobileExists(db, mobile) {
        return db.User.count({ where: { mobile } }).then((rows) => {
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
