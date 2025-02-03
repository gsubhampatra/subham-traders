import prisma from "../prisma";

// Create a new dealer
export const createDealer = async (
  name: string,
  contact: string,
  address: string
) => {
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
        mode: "insensitive",
      },
    },
  });
};

//delete dealer
export const deleteDealer = async (id: number) => {
  return await prisma.dealer.delete({
    where: { id },
  });
};

//update dealer
export const updateDealer = async (
  id: number,
  { name, contact, address }: { name?: string; contact?: string; address?: string }
) => {
  return await prisma.dealer.update({
    where: { id },
    data: { name, contact, address },
  });
};

