module.exports = function(sequelize, DataTypes) {

    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            type:  DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName:true
    });
/*
    Burger.associate = function(models) {
        // a Burger belongs to a Customer
        // A Burger can't be created without a Customer due to the foreign key constraint
        Burger.belongsTo(models.Customer, {
          foreignKey: {
            allowNull: false
          }
        });
      };
*/
    return Burger;
};    