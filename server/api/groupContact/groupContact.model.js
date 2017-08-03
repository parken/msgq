
export default function (sequelize, DataTypes) {
  const GroupContact = sequelize.define('GroupContact', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'group_contacts',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        GroupContact.belongsTo(db.Contact, {
          foreignKey: 'contactId',
          allowNull: false,
        });
        GroupContact.belongsTo(db.Group, {
          foreignKey: 'groupId',
          allowNull: false,
        });
      },
    },
  });

  return GroupContact;
}
