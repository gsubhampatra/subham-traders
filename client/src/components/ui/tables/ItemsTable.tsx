import { useState } from "react";
import ItemForm from "../forms/ItemForm";
import { useDeleteItem, useItems } from "../../../hooks/useItem";
import { Item } from "../../../types/responseTypes";

function ItemsTable() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading, error } = useItems();
  const deleteItem = useDeleteItem();

  const [selectedItem, setSelectedItem] = useState<Item>();

  if (isLoading) {
    return <div className="text-3xl text-amber-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-2xl text-red-600">{error.message}</div>;
  }

  const handleDelete = async (id: number) => {
    await deleteItem.mutateAsync(id);
  };

  if (deleteItem.isPending) {
    return <div className="text-3xl text-amber-500">Deleting...</div>;
  }

  if (deleteItem.isError) {
    return (
      <div className="text-2xl text-red-600">{deleteItem.error.message}</div>
    );
  }

  if (deleteItem.isSuccess) {
    alert("Item deleted successfully");
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 text-white rounded bg-amber-600 hover:bg-amber-700"
        >
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-amber-200 border-amber-400">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Unit Price
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.items?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{item.unitPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsFormOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto ${
          isFormOpen ? "" : "hidden"
        }`}
      >
        <ItemForm
          item={selectedItem}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedItem({} as Item);
          }}
        />
      </div>
    </>
  );
}

export default ItemsTable;
