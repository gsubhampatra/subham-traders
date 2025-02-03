// components/Dealers/DealersPage.tsx
import React, { useState } from "react";

import {
  useGetAllDealers,
  useDeleteDealer,
  useSearchDealers,
} from "../../hooks/dealerHooks";
import { Dealer } from "../../types/responseTypes";
import { toast } from "react-hot-toast";
import { RiAddLine, RiSearchLine } from "react-icons/ri";
import { Modal } from "../ui/common/Modal";
import { Button } from "../ui/common/Button";
import { DealerTable } from "../ui/tables/DealerTable";
import { DealerForm } from "../ui/forms/DealerForm";

const DealersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const {
    data: dealers,
    isLoading,
    error,
  } = searchTerm ? useSearchDealers(searchTerm) : useGetAllDealers();

 

  const deleteMutation = useDeleteDealer();

  const handleAddDealer = () => {
    setSelectedDealer(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (dealer: Dealer) => {
    try {
      await deleteMutation.mutateAsync(dealer.id);
      toast.success("Dealer deleted successfully");
    } catch {
      toast.error("Failed to delete dealer");
    }
  };

  const handleEdit = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setIsModalOpen(true);
  };

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="container px-4 py-6 mx-auto md:max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-center uppercase md:text-3xl text-primary">
        Dealers Management
      </h1>

      <div className="flex flex-col justify-between mb-4 space-y-2 md:flex-row md:space-y-0">
        <div className="flex items-center w-full space-x-2 md:w-auto">
          <input
            type="text"
            placeholder="Search dealers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-md"
          />
          <RiSearchLine className="text-gray-500" />
        </div>

        <Button
          onClick={handleAddDealer}
          className="flex items-center justify-center w-full space-x-2 md:w-auto"
        >
          <RiAddLine />
          <span>Add Dealer</span>
        </Button>
      </div>

      <DealerTable
        dealers={dealers || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDealer ? "Edit Dealer" : "Add Dealer"}
      >
        <DealerForm
          initialDealer={selectedDealer}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DealersPage;
