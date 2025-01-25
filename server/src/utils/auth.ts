import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Generate JWT Token
export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

// Hash Password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare Password
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
