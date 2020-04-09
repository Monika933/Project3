module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define("Client", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      
  
      loggedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });
  
   Client.associate = function(models) {
     // An Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      Client.hasMany(models.Appointment, {
        onDelete: "cascade"
      });
    };
  
    return Client;
  };
  