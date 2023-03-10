const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Tag =  require('./tag');

const db = {};

let sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Tag = Tag;

User.init(sequelize);
Post.init(sequelize);
Tag.init(sequelize);

User.associate(db);
Post.associate(db);
Tag.associate(db);

module.exports = db;
