import { useMutation } from "@tanstack/react-query";
import api, { API_ROUTE } from "../../../api";
import { Button } from "../common/Button";
import { useState } from "react";
import { queryClient } from "../../../main";
import toast from "react-hot-toast";
import { Modal } from "../common/Modal";

 const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    creditBalance: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const { isPending, mutate, isSuccess, error } = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post(API_ROUTE.CUSTOMER.CREATE, data);
      return response.data;
    },
  });
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: [API_ROUTE.CUSTOMER.GET_ALL] });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };
  if (error) {
    toast.error("Error creating customer. Please try again.");
  }
  if (isSuccess) {
    toast.success("Customer created successfully!");
    setFormData({
      name: "",
      contact: "",
      address: "",
      creditBalance: 0,
    });
  }

  return (
    <div className="max-w-lg p-6 mx-auto rounded-lg shadow-lg bg-primary-bg">
      <Button
        variant="primary"
        onClick={toggleModal}
        className="w-full mb-4"
      >
        Create Customer
      </Button>
    <Modal isOpen={isOpen} onClose={toggleModal } title="Create Customer">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Credit Balance
          </label>
          <input
            type="number"
            name="creditBalance"
            value={formData.creditBalance}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <Button type="submit"  isLoading={isPending} variant="submit">
          {isPending ? "Creating..." : "Create Customer"}
        </Button>
      </form>
    </Modal>
    </div>
  );
};

export default CreateCustomer;
