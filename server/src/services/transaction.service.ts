import prisma from "../prisma";

// Create a new transaction
export const createTransaction = async (
  dealerId: number,
  userId: number,
  items: { itemId: number; quantity: number; price: number }[],
  totalPrice: number
) => {
  return await prisma.transaction.create({
    data: {
      dealerId,
      userId,
      totalPrice,
      items: {
        create: items.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });
};

// Get all transactions
export const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    include: { dealer: true, items: true },
  });
};

export const getTransactionsByDate = async (startDate: Date, endDate: Date) => {
  return await prisma.transaction.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      dealer: true,
      items: {
        include: {
          item: true,
        },
      },
    },
  });
};
