import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useCreateItemMutation,
  useItemStore,
  useUpdateItemMutation,
} from "../../../hooks/itemHooks";
import LangInput from "../LangInput";

interface ItemFormProps {
  onClose: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onClose }) => {
  const { selectedItem, setSelectedItem } = useItemStore();
  const createMutation = useCreateItemMutation();
  const updateMutation = useUpdateItemMutation();

  const [formData, setFormData] = useState({
    name: selectedItem?.name || "",
    unitPrice: selectedItem ? String(selectedItem.unitPrice) : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        unitPrice: Number(formData.unitPrice),
      };

      if (selectedItem?.id) {
        await updateMutation.mutateAsync({ ...payload, id: selectedItem.id });
      } else {
        await createMutation.mutateAsync(payload);
      }

      toast.success("Item saved successfully");
      setSelectedItem(null);
      onClose();
    } catch {
      toast.error("Failed to save item");
    } finally {
      setIsSubmitting(false);
    }
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
          placeholder="Item Name"
          isRequired={true}
          className="w-full"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Unit Price
        </label>
        <input
          type="number"
          value={formData.unitPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, unitPrice: e.target.value }))
          }
          placeholder="Unit Price"
          step="0.01"
          required
          className="w-full px-3 py-2 border rounded-md"
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
