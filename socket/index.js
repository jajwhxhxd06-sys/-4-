const { Message, User, Channel } = require('../models');

module.exports.setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-channel', (channelId) => {
      socket.join(`channel-${channelId}`);
    });

    socket.on('send-message', async (data) => {
      const { channelId, userId, content, attachments } = data;
      const message = await Message.create({
        content,
        userId,
        channelId,
        attachments: attachments || []
      });
      const msgWithUser = await Message.findByPk(message.id, {
        include: [{ model: User, attributes: ['id', 'username', 'avatar'] }]
      });
      io.to(`channel-${channelId}`).emit('new-message', msgWithUser);
    });

    socket.on('typing', ({ channelId, userId, username }) => {
      socket.to(`channel-${channelId}`).emit('user-typing', { userId, username });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
