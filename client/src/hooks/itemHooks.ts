import { create } from "zustand";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createItemApi,
  updateItemApi,
  deleteItemApi,
  getItemsApi,
} from "../utils/apiFunctions";
import { Item } from "../types/responseTypes";
import { queryClient } from "../main";

// Query Keys
const ITEMS_QUERY_KEY = ["items"];

// Store Types
interface ItemState {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

// Zustand Store
export const useItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

// TanStack Query Hooks
export const useItems = () => {
  return useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const response = await getItemsApi();
      return response.items;
    },
  });
};
export const useCreateItemMutation = () => {
  return useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};

export const useUpdateItemMutation = () => {
  return useMutation({
    mutationFn: updateItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};

export const useDeleteItemMutation = () => {
  return useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};
