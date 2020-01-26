module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define('Burger', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    freezeTableName: true
  })
  Burger.associate = function (models) {
    // User Belongs to a burger since they are just being added to eat the created burger
    Burger.hasOne(models.User, {
      foreignKey: {
        name: 'burgerId',
        allowNull: true
      },
      onDelete: 'cascade'
    })
  }

  return Burger
}
