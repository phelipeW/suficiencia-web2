const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Posts', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
          description: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          ingredients: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          photo: {
            type: DataTypes.STRING,
          },
          price: {
            allowNull: false,
            type: DataTypes.DOUBLE,
          },
          likes: {
            allowNull: true,
            type: DataTypes.INTEGER,
          }
    });
    return Post;
}