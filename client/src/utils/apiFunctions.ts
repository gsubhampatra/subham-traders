import { api, API_ROUTE } from "../api";
import {
  CreateDealerInput,
  CreateItemInput,
  UpdateItemInput,
} from "../types/inputTypes";
import {
  ItemsResponse,
  ItemResponse,
  DealerResponse,
} from "../types/responseTypes";

export const getItemsApi = async (): Promise<ItemsResponse> => {
  const response = await api.get(API_ROUTE.ITEM.GET_ALL);
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const getItemApi = async (id: number): Promise<ItemResponse> => {
  const response = await api.get(
    API_ROUTE.ITEM.GET_ONE.replace(":id", id.toString())
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const createItemApi = async (
  input: CreateItemInput
): Promise<ItemResponse> => {
  const response = await api.post(API_ROUTE.ITEM.CREATE, input);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const updateItemApi = async ({
  id,
  ...input
}: UpdateItemInput): Promise<ItemResponse> => {
  const response = await api.put(
    API_ROUTE.ITEM.UPDATE.replace(":id", id.toString()),
    input
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const deleteItemApi = async (id: number): Promise<ItemResponse> => {
  const response = await api.delete(
    API_ROUTE.ITEM.DELETE.replace(":id", id.toString())
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

//get all dealers

export const getAllDealersApi = async (): Promise<DealerResponse> => {
  const response = await api.get(API_ROUTE.DEALER.GET_ALL);
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

//create dealer

export const createDealerApi = async (
  input: CreateDealerInput
): Promise<any> => {
  const response = await api.post(API_ROUTE.DEALER.CREATE, input);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

//delete dealer

export const deleteDealerApi = async (id: number): Promise<any> => {
  const response = await api.delete(
    API_ROUTE.DEALER.DELETE.replace(":id", id.toString())
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

//update dealer

export const updateDealerApi = async (
  id: number,
  input: CreateDealerInput
): Promise<any> => {
  const response = await api.put(
    API_ROUTE.DEALER.UPDATE.replace(":id", id.toString()),
    input
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

//search dealer

export const searchDealerApi = async (name: string): Promise<any> => {
  const response = await api.get(`${API_ROUTE.DEALER.SEARCH}?name=${name}`);
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};
