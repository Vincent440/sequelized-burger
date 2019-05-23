module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
    {
        freezeTableName:true
    });
    
    User.associate = function (models) {

        //User Belongs to a burger since they are just being added to eat a single burger
        User.belongsTo(models.Burger, {
            foreignKey: {
            name: 'burgerId',
            allowNull: false
        },
            onDelete: "cascade"
        });

    };

    return User;

}; 