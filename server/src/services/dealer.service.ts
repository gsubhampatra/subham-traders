import prisma from "../prisma";

// Create a new dealer
export const createDealer = async (name: string, contact: string, address: string) => {
  return await prisma.dealer.create({
    data: { name, contact, address },
  });
};

// Get all dealers
export const getAllDealers = async () => {
  return await prisma.dealer.findMany();
};

// Search dealer by name
export const searchDealer = async (name: string) => {
  return await prisma.dealer.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
};
