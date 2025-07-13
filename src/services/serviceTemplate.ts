// This is a template for creating new service files
import { api } from './api';
import { useQuery, useMutation } from '@tanstack/react-query';

// Define your types here
interface YourItemType {
  id: string;
  // Add other properties
}

// CRUD operations
export const useGetItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: () => api.get('/your-endpoint'),
  });
};

export const useCreateItem = () => {
  return useMutation({
    mutationFn: (data: Partial<YourItemType>) => api.post('/your-endpoint', data),
  });
};

export const useUpdateItem = () => {
  return useMutation({
    mutationFn: (data: { id: string; updates: Partial<YourItemType> }) => 
      api.patch(`/your-endpoint/${data.id}`, data.updates),
  });
};

export const useDeleteItem = () => {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/your-endpoint/${id}`),
  });
};
