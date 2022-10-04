const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comments', {
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
         
    });
    return Comment;
}