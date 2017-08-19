export default function (sequelize, DataTypes) {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.STRING,
  }, {
    tableName: 'contacts',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Contact.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });

        Contact.hasMany(db.GroupContact);
      },
    },
  });

  return Contact;
}
