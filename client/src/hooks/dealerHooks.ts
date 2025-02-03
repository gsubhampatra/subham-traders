import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllDealersApi,
  createDealerApi,
  searchDealerApi,
  updateDealerApi,
  deleteDealerApi,
} from "../utils/apiFunctions";
import { CreateDealerInput, UpdateDealerInput } from "../types/inputTypes";
import { queryClient } from "../main";

// Get all dealers hook
export const useGetAllDealers = () => {
  return useQuery({
    queryKey: ["dealers"],
    queryFn: () => getAllDealersApi().then((response) => response.dealers),
  });
};

// Create dealer hook
export const useCreateDealer = () => {
  return useMutation({
    mutationFn: (input: CreateDealerInput) => createDealerApi(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
    },
  });
};

// Search dealers hook
export const useSearchDealers = (name: string) => {
  return useQuery({
    queryKey: ["dealers", "search", name],
    queryFn: () => searchDealerApi(name).then((response) => response.dealers),
    enabled: name.length > 0,
  });
};

// Update dealer hook
export const useUpdateDealer = () => {
  return useMutation({
    mutationFn: (input: UpdateDealerInput) =>
      updateDealerApi(input.id, input as CreateDealerInput),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
    },
  });
};

// Delete dealer hook
export const useDeleteDealer = () => {
  return useMutation({
    mutationFn: (id: number) => deleteDealerApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
    },
  });
};
