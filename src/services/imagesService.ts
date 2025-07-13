import { api } from "./api";

export async function uploadImages({ title, description, images, apiEndpoint }: { title: string; description: string; images: string[]; apiEndpoint?: string }): Promise<any> {
  const endpoint = apiEndpoint || '/images';
  const response = await api.post(endpoint, { title, description, images });
  return response.data;
}

export async function getImageDetail(id: string | number) {
  const response = await api.get(`/images/${id}`);
  return response.data;
}

export async function updateImage(id: string | number, data: { title: string; description: string }) {
  const response = await api.put(`/images/${id}`, data);
  return response.data;
}

export async function deleteImageById(id: string | number) {
  return api.delete(`/images/${id}`);
} 