const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const db = {};
const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.js')(sequelize)
db.post = require('./post.js')(sequelize)
db.comment = require('./comment.js')(sequelize)


db.user.hasMany(db.post)
db.post.belongsTo(db.user, { as: 'User', constraints: false, })

db.post.hasMany(db.comment)
db.comment.belongsTo(db.post, { as: 'Post', constraints: false })

module.exports = db;