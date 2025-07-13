import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  links: { id: number; url: string }[];
}

export default function UserLinks() {
  const { id } = useParams<{ id?: string }>();
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ['user-links', id],
    queryFn: async () => {
      if (id) {
        const res = await api.get(`/links/${id}`);
        return res.data;
      }
      return undefined;
    },
    enabled: !!id,
  });

  if (!id) {
    return <div className="p-8 text-center text-gray-500 bg-gray-300 min-h-screen">Akses list koleksi link hanya untuk user terautentikasi.</div>;
  }
  if (isLoading) return <div className="p-8 text-center bg-gray-300 min-h-screen">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-gray-300 min-h-screen">Failed to load link detail</div>;
  if (!data) return <div className="p-8 text-center text-gray-500 bg-gray-300 min-h-screen">Data tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center py-8 px-2">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg flex flex-col items-center">
        <h1 className="font-bold text-2xl mb-4 text-center w-full break-words">{data.title}</h1>
        <div className="text-gray-600 text-base text-center mb-6 w-full break-words">Here is your Link</div>
        <div className="w-full flex flex-col items-center">
          {data.links && data.links.length > 0 ? (
            <a
              href={data.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all text-lg text-center max-w-full"
            >
              {data.links[0].url}
            </a>
          ) : (
            <span className="text-gray-400">No Link</span>
          )}
        </div>
      </div>
    </div>
  );
} 