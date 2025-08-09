import dotenv from "dotenv";
dotenv.config();

const configVariables = {
  stage: process.env.STAGE || "dev",
  mongoURL:
    process.env.MONGO_URL || 'mongodb://localhost:27017/hrsm-system',
  PORT: Number(process.env.PORT) || 8080,
  JWT_SECRET: "hrmssystem@!@#$%",
  EMAIL_USER:'rajputrishabh359@gmail.com',
  EMAIL_PASS:'egioayvdqyoktmfr',
};
export default configVariables;
