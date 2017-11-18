import Hosting from '../../components/hosting';

export default function (sequelize, DataTypes) {
  const Domain = sequelize.define('Domain', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    classkey: DataTypes.STRING,
    price: DataTypes.STRING,
    existing: DataTypes.BOOLEAN,
    expiresAt: { type: DataTypes.DATE },
  }, {
    tableName: 'domains',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Domain.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        Domain.belongsTo(db.DomainType, {
          foreignKey: 'domainTypeId',
          allowNull: true,
        });
      },
    },
    hooks: {
      afterCreate(instance) {
        if (instance.existing) return Promise.resolve();
        if (!Hosting.ownDomains.some(x => instance.name.endsWith(x))) {
          return Promise.resolve();
        }
        return Promise
          .all([
            Hosting.s3.generateWebsite(instance.name),
            Hosting.s3.register(instance.name),
          ])
          .then(([domainPath, s3site]) => Promise
            .all([
              Hosting.domain.createCNAME(instance.name.slice(-6), {
                name: instance.name.split('.').shift(),
                data: `${s3site.url.substr(7)}.`,
              }),
              Hosting.s3.deploy(instance.name),
            ]));
      },
    },
  });

  return Domain;
}
