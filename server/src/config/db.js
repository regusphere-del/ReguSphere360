import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[MongoDB] MONGODB_URI is not set. Operating in resilient In-Memory mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Atlas Connection: ${error.message}`);
    console.warn('[MongoDB Notice] If this is "SSL alert number 80", ensure your IP is whitelisted in MongoDB Atlas Network Access (or set to 0.0.0.0/0).');
    console.log('[MongoDB Notice] Running in dual-resilience mode: data will be cached in-memory and synced when connected.');
    return false;
  }
};

export const getDBStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
});
