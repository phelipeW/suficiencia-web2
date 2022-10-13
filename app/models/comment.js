const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comments', {
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        rating: {
            allowNull: false,
            type: DataTypes.DECIMAL(10,2),
        }
         
    });
    return Comment;
}