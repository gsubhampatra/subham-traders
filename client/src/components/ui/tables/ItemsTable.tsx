// components/Items/ItemTable.tsx
import React from "react";
import { Table } from "../common/Table";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { Item } from "../../../types/responseTypes";

interface ItemTableProps {
  items: Item[];
  isLoading: boolean;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export const ItemTable: React.FC<ItemTableProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const columns = [
    {
      header: "Name",
      accessor: "name",
      className: "w-1/2",
    },
    {
      header: "Unit Price",
      accessor: "unitPrice",
      render: (item: Item) => `₹${item.unitPrice.toFixed(2)}`,
      className: "w-1/4 text-right",
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item: Item) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <RiEditLine className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedItem(item);
              setIsDeleteModalOpen(true);
            }}
            className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <RiDeleteBinLine className="w-4 h-4" />
          </button>
        </div>
      ),
      className: "w-1/4 text-right",
    },
  ];

  const handleConfirmDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={items}
        emptyMessage="No items found"
        loading={isLoading}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
};
