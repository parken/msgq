export default function (sequelize, DataTypes) {
  const Campaign = sequelize.define('Campaign', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'campaigns',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Campaign.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
      },
    },
  });

  return Campaign;
}
