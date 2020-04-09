module.exports = function(sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
  
      duration: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      treatment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1500]
        }
      },
      phoneNumberShorten: {
        type: DataTypes.TEXT,
        validate: {
          len: [1, 150]
        }
      },
      phoneNumberShortenTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      appointmentPhoto: {
        type: DataTypes.STRING,
      },
      clientName: {
        type: DataTypes.STRING
      },
      clientAccept: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      requesterAccept: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      clientMarkComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      requesterMarkComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      appointId: {
        type: DataTypes.INTEGER
      },
      appointName: {
        type: DataTypes.STRING
      },
      appointmentPaid: {
        type: DataTypes.BOOLEAN
      },
      appointmentComment: {
        type: DataTypes.TEXT,
        validate: {
          len: [1, 250]
        }
      },
      appointmentCommentTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          len: [1, 250]
        }
      }
    });
  
   Appointment.associate = function(models) {
     // An Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      Appointment.belongsTo(models.Client, {
        foreignKey:{
          allowNull: false
        }
      });
    };
  
  
     Appointment.associate = function(models) {
     // An Appointment must belong to a Client; an Appointment can't be created without a Client due to the foreign key constraint
      Appointment.hasMany(models.Schedule, {
        onDelete: "cascade"
      });
    };
    return Appointment;
  };
  