import prisma from "../prisma";

// Create item
export const createItem = async (name: string, unitPrice: number) => {
  return await prisma.item.create({
    data: { name, unitPrice },
  });
};

// Update item
export const updateItem = async (
  id: number,
  { name, unitPrice }: { name?: string; unitPrice?: number }
) => {
  return await prisma.item.update({
    where: { id },
    data: { name, unitPrice },
  });
};

// Delete item
export const deleteItem = async (id: number) => {
  return await prisma.item.delete({
    where: { id },
  });
};

// Get item
export const getItem = async (id: number) => {
  return await prisma.item.findUnique({
    where: { id },
  });
};

// Get all items
export const getItems = async () => {
  return await prisma.item.findMany();
};
