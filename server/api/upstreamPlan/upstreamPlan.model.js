
import logger from '../../components/logger';

export default function (sequelize, DataTypes) {
  const UpstreamPlan = sequelize.define('UpstreamPlan', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    count: DataTypes.INTEGER,
  }, {
    tableName: 'upstream_plans',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        UpstreamPlan.db = db;
        UpstreamPlan.belongsTo(db.User, {
          foreignKey: 'createdBy',
          allowNull: false,
        });
        UpstreamPlan.belongsTo(db.User, {
          foreignKey: 'updatedBy',
          allowNull: false,
        });
        UpstreamPlan.belongsTo(db.Upstream, {
          foreignKey: 'upstreamId',
          allowNull: false,
        });
      },
    },
    hooks: {
      afterCreate(instance) {
        const db = UpstreamPlan.db;
        return db.Upstream.find({ id: instance.upstreamId })
          .then(upstream => Promise.all([
            upstream.increment({ balance: instance.count }),
            db.Sending.create({
              limit: instance.count,
              createdBy: instance.createdBy,
              updatedBy: instance.updatedBy,
              userId: 1,
              routeId: upstream.routeId,
            }),
          ]))
          .catch(err => logger.error(err));
      },
    },
  });

  return UpstreamPlan;
}
