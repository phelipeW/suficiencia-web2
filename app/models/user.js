const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('Users', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        userType: {
            allowNull:false,
            type: DataTypes.STRING,
        },
    });

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.password;
        return values;
      }
  
    return User;
  
}