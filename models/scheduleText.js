module.exports = function(sequelize, DataTypes) {
    var ScheduleText = sequelize.define("ScheduleText", {
      schedule: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 500]
        }
      },
      newScheduleTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      clientName: {
        type: DataTypes.STRING
      },
      clientId: {
        type: DataTypes.INTEGER
      },
      appointName: {
        type: DataTypes.STRING
      },
      appointId: {
        type: DataTypes.INTEGER
      }
    });
  
    ScheduleText.associate = function(models) {
      // An Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      ScheduleText.belongsTo(models.Schedule, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
  
    return ScheduleText;
  };