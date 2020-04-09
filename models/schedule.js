module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
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
      },
    });
  
  
   Schedule.associate = function(models) {
     // An Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      Schedule.belongsTo(models.Appointment, {
        foreignKey:{
          allowNull: false
        }
      });
   };
     Schedule.associate = function(models) {
     // A Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      Schedule.hasMany(models.ScheduleText, {
        onDelete: "cascade"
      });
    };
  
    return Schedule;
  };
  
  
  