module.exports = {
  FRONT_PORT: 3000,
  BACKEND_PORT: 8000,
  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3307,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 5,
    connectTimeout: 5000,
  },
};
