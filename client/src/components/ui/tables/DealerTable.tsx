// components/Dealers/DealerTable.tsx
import React, { useState } from "react";
import { Table } from "../common/Table";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { Dealer } from "../../../types/responseTypes";

interface DealerTableProps {
  dealers: Dealer[];
  isLoading: boolean;
  onEdit: (dealer: Dealer) => void;
  onDelete: (dealer: Dealer) => void;
}

export const DealerTable: React.FC<DealerTableProps> = ({
  dealers,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns = [
    {
      header: "Name",
      accessor: "name",
      className: "w-1/3",
    },
    {
      header: "Contact",
      accessor: "contact",
      className: "w-1/3",
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (dealer: Dealer) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(dealer)}
            className="p-1.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <RiEditLine className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedDealer(dealer);
              setIsDeleteModalOpen(true);
            }}
            className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <RiDeleteBinLine className="w-4 h-4" />
          </button>
        </div>
      ),
      className: "w-1/3 text-right",
    },
  ];

  const handleConfirmDelete = () => {
    if (selectedDealer) {
      onDelete(selectedDealer);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={dealers}
        emptyMessage="No dealers found"
        loading={isLoading}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Dealer"
        message="Are you sure you want to delete this dealer?"
      />
    </>
  );
};
