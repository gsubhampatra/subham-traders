// components/Dealers/DealerForm.tsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  CreateDealerInput,
  UpdateDealerInput,
} from "../../../types/inputTypes";
import { useCreateDealer, useUpdateDealer } from "../../../hooks/dealerHooks";
import LangInput from "../LangInput";

interface DealerFormProps {
  initialDealer?: UpdateDealerInput | null;
  onClose: () => void;
}

export const DealerForm: React.FC<DealerFormProps> = ({
  initialDealer,
  onClose,
}) => {
  const createMutation = useCreateDealer();
  const updateMutation = useUpdateDealer();

  const [formData, setFormData] = useState<CreateDealerInput>({
    name: initialDealer?.name || "",
    contact: initialDealer?.contact || "",
    address: initialDealer?.address || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (initialDealer) {
        // Update existing dealer
        const updateInput: UpdateDealerInput = {
          id: initialDealer.id,
          ...formData,
        };
        await updateMutation.mutateAsync(updateInput);
      } else {
        // Create new dealer
        await createMutation.mutateAsync(formData);
      }

      toast.success(
        `Dealer ${initialDealer ? "updated" : "created"} successfully`
      );
      onClose();
    } catch (error) {
      toast.error("Failed to save dealer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <LangInput
          name="name"
          value={formData.name}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, name: value }))
          }
          isRequired
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Dealer Name"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          inputMode="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Contact Number"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Address
        </label>
        <LangInput
          name="address"
          value={formData.address}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, address: value }))
          }
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Dealer Address"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
