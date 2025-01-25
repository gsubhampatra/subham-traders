import prisma from "../prisma";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

// Register a new user
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "ADMIN" | "STAFF"
) => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  // Exclude password from the user object
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user.id, user.role);
  console.log(token);

  // Exclude password from the user object
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
