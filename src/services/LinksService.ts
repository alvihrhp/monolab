import { api } from "./api";

export async function getAllLinks(params?: any) {
  const response = await api.get("/links", { params });
  return response.data;
}

export async function getLinkById(id: number | string) {
  const response = await api.get(`/links/${id}`);
  return response.data;
}

export async function createLink(data: { title: string; description?: string; url: string }) {
  const response = await api.post("/links", data);
  return response.data;
}

export async function updateLink(id: number | string, data: { title: string; description?: string; product_id: number; url: string }) {
  const response = await api.put(`/links/${id}`, data);
  return response.data;
}

export async function deleteLink(id: number | string, product_id: number) {
  const response = await api.delete(`/links/${id}`, { data: { product_id } });
  return response.data;
} 