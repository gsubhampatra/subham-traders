import { api, API_ROUTE } from "../api";
import { CreateItemInput, UpdateItemInput } from "../types/inputTypes";
import { ItemsResponse, ItemResponse } from "../types/responseTypes";

export const getItemsApi = async (): Promise<ItemsResponse> => {
  const { data } = await api.get(API_ROUTE.ITEM.GET_ALL);
  return data;
};

export const getItemApi = async (id: number): Promise<ItemResponse> => {
  const { data } = await api.get(
    API_ROUTE.ITEM.GET_ONE.replace(":id", id.toString())
  );
  return data;
};

export const createItemApi = async (
  input: CreateItemInput
): Promise<ItemResponse> => {
  const { data } = await api.post(API_ROUTE.ITEM.CREATE, input);
  return data;
};

export const updateItemApi = async ({
  id,
  ...input
}: UpdateItemInput): Promise<ItemResponse> => {
  const { data } = await api.put(
    API_ROUTE.ITEM.UPDATE.replace(":id", id.toString()),
    input
  );
  return data;
};

export const deleteItemApi = async (id: number): Promise<ItemResponse> => {
  const { data } = await api.delete(
    API_ROUTE.ITEM.DELETE.replace(":id", id.toString())
  );
  return data;
};
