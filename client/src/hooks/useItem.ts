import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItemApi,
  deleteItemApi,
  getItemApi,
  getItemsApi,
  updateItemApi,
} from "../utils/apiFunctions";

// Query Keys
export const itemKeys = {
  all: ["items"] as const,
  detail: (id: number) => [...itemKeys.all, id] as const,
};

// Queries
export const useItems = () => {
  return useQuery({
    queryKey: itemKeys.all,
    queryFn: getItemsApi,
  });
};

export const useItem = (id: number) => {
  return useQuery({
    queryKey: itemKeys.detail(id),
    queryFn: () => getItemApi(id),
    enabled: !!id,
  });
};

// Mutations
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItemApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemApi,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};
