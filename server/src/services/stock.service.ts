import prisma from "../prisma";

// Increment stock
export const incrementStock = async (itemId: number, quantity: number) => {
  return await prisma.stock.update({
    where: { itemId },
    data: { quantity: { increment: quantity } },
  });
};

// Decrement stock
export const decrementStock = async (itemId: number, quantity: number) => {
  return await prisma.stock.update({
    where: { itemId },
    data: { quantity: { decrement: quantity } },
  });
};

// Update stock
export const updateStock = async (itemId: number, quantity: number) => {
  return await prisma.stock.update({
    where: { itemId },
    data: { quantity },
  });
};

// Get stock details
export const getStock = async () => {
  return await prisma.stock.findMany({
    include: { item: true },
  });
};

// Update stock based on transaction items
export const updateStockForTransaction = async (transactionId: number) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: {
      items: true, // Includes the transaction items
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  for (const transactionItem of transaction.items) {
    const { itemId, quantity } = transactionItem;

    // Deduct quantity from stock
    await prisma.stock.update({
      where: { itemId },
      data: {
        quantity: { increment: quantity },
      },
    });
  }

  return `Stock updated for transaction ID: ${transactionId}`;
};
