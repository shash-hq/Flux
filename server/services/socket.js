const socketIo = require('socket.io');
const redis = require('redis');

let io;
let redisClient;
let redisSubscriber;

const initSocket = async (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Initialize Redis
  redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  redisSubscriber = redisClient.duplicate();

  await redisClient.connect();
  await redisSubscriber.connect();

  console.log('Redis connected');

  // Subscribe to updates channel
  await redisSubscriber.subscribe('TREND_UPDATES', (message) => {
    try {
      const trend = JSON.parse(message);
      io.emit('new_trend', trend);
      console.log('Broadcasted new trend:', trend.title);
    } catch (e) {
      console.error('Error parsing trend update:', e);
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const getRedis = () => {
  if (!redisClient) {
    throw new Error("Redis not initialized!");
  }
  return redisClient;
}

module.exports = { initSocket, getIo, getRedis };
