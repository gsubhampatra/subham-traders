import React, { useState } from "react";

import {
  useItems,
  useDeleteItemMutation,
  useItemStore,
} from "../../hooks/itemHooks";
import { Item } from "../../types/responseTypes";
import { toast } from "react-hot-toast";
import { RiAddLine } from "react-icons/ri";
import { Button } from "../ui/common/Button";
import { ItemTable } from "../ui/tables/ItemsTable";
import { Modal } from "../ui/common/Modal";
import { ItemForm } from "../ui/forms/ItemForm";

export const ItemsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedItem } = useItemStore();
  const { data: items, isLoading, error } = useItems();
  const deleteMutation = useDeleteItemMutation();

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Item) => {
    try {
      await deleteMutation.mutateAsync(item.id);
      toast.success("Item deleted successfully");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="container px-4 py-6 mx-auto md:max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-center uppercase md:text-3xl text-primary">
        Items Management
      </h1>

      <div className="flex justify-end mb-4">
        <Button onClick={handleAddItem} className="flex items-center space-x-2">
          <RiAddLine />
          <span className="hidden md:inline">Add Item</span>
        </Button>
      </div>

      <ItemTable
        items={items || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Item Details"
      >
        <ItemForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
