export const BACKEND_URL = "http://localhost:5001";

// MongoDB connection configuration with authentication placeholders
export const MONGO_USERNAME = '<your-username>';
export const MONGO_PASSWORD = '<your-password>';
export const MONGO_HOST = 'localhost';
export const MONGO_PORT = '27017';
export const MONGO_DB = 'brainly';

export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
