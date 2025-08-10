import dotenv from "dotenv";
dotenv.config();

const configVariables = {
  stage: process.env.STAGE || "dev",
  mongoURL:
    process.env.MONGO_URL || 'mongodb+srv://csbigproduct:aftab123@cluster0.dvssrwp.mongodb.net/',
  PORT: Number(process.env.PORT) || 8080,
  JWT_SECRET: "hrmssystem@!@#$%",
  EMAIL_USER:'rajputrishabh359@gmail.com',
  EMAIL_PASS:'egioayvdqyoktmfr',
};
export default configVariables;
