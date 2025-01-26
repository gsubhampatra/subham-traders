import { useState, useEffect } from "react";
import OdiaInput from "../OdiaInput";
import { useCreateItem, useUpdateItem } from "../../../hooks/useItem";

interface ItemFormProps {
  item?: {
    id: number;
    name: string;
    unitPrice: number;
  } | null;
  onClose: () => void;
}

function ItemForm({ item, onClose }: ItemFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    unitPrice: 0,
  });

  const createItem = useCreateItem();
  const updateItem = useUpdateItem();

  // Sync formData with the incoming `item` prop
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        unitPrice: item.unitPrice || 0,
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (item?.id) {
        await updateItem.mutateAsync({
          id: item.id,
          ...formData,
        });
      } else {
        await createItem.mutateAsync(formData);
      }
      onClose();
      setFormData({ name: "", unitPrice: 0 });
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unitPrice" ? Number(value) : value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Name
        </label>
        <OdiaInput
          name="name"
          value={formData.name}
          onChange={(value) =>
            handleChange({ target: { name: "name", value } })
          }
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Unit Price
        </label>
        <input
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          min={0}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-amber-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {item?.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
