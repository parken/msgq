export default function (sequelize, DataTypes) {
  const PriorityNumber = sequelize.define('PriorityNumber', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
  }, {
    tableName: 'priority_numbers',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        PriorityNumber.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
      },
    },
  });

  return PriorityNumber;
}
