module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, defaultValue: 'default.png' },
    discriminator: { type: DataTypes.STRING(4), defaultValue: '0000' },
    status: { type: DataTypes.ENUM('online', 'idle', 'dnd', 'offline'), defaultValue: 'offline' }
  });
};
