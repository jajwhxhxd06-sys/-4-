const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

const User = require('./User')(sequelize);
const Server = require('./Server')(sequelize);
const Channel = require('./Channel')(sequelize);
const Message = require('./Message')(sequelize);
const Role = require('./Role')(sequelize);
const Member = require('./Member')(sequelize);

// Relationships
Server.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Server.hasMany(Channel);
Channel.belongsTo(Server);
Channel.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Channel);
Server.hasMany(Member);
Member.belongsTo(User);
Member.belongsTo(Server);
Server.hasMany(Role);
Role.belongsTo(Server);

module.exports = { sequelize, User, Server, Channel, Message, Role, Member };
