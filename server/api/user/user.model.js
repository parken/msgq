
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
    mobile: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.STRING,
    designation: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    pincode: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    otpStatus: DataTypes.INTEGER,
    password: DataTypes.STRING,
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

      revokeTokens(models) {
        const expires = new Date();
        return Promise.all([
          models.AccessToken.update(
            { expires },
            { where: { userId: this.id } }
          ),
          models.RefreshToken.update(
            { expires },
            { where: { userId: this.id } }
          ),
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
        // User.hasMany(db.Msg, {
        //   foreignKey: 'userId',
        // });
        //
        // User.hasMany(db.WBranch, {
        //   foreignKey: 'userId',
        // });
        //
        // User.belongsTo(db.Obj, {
        //   foreignKey: 'objId',
        // });
        //
        // User.hasMany(db.Business, {
        //   foreignKey: 'userId',
        // });
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
