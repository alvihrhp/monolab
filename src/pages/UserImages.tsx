import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  images: { id: number; image: string }[];
}

export default function UserImages() {
  const { id } = useParams<{ id?: string }>();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ['user-images', id],
    queryFn: async () => {
      if (id) {
        const res = await api.get(`/images/${id}`);
        return res.data;
      }
      return undefined;
    },
    enabled: !!id,
  });

  if (!id) {
    return <div className="p-8 text-center text-gray-500 bg-gray-300 min-h-screen">Akses list koleksi gambar hanya untuk user terautentikasi.</div>;
  }
  if (isLoading) return <div className="p-8 text-center bg-gray-300 min-h-screen">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-gray-300 min-h-screen">Failed to load image detail</div>;
  if (!data) return <div className="p-8 text-center text-gray-500 bg-gray-300 min-h-screen">Data tidak ditemukan</div>;

  // Tampilkan detail satu produk dengan desain card dan gambar vertikal
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center py-8 px-2">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg flex flex-col items-center">
        <h1 className="font-bold text-2xl mb-4 text-center w-full break-words">{data.title}</h1>
        <div className="flex flex-col gap-4 w-full">
          {data.images && data.images.length > 0 ? data.images.map(img => (
            <img
              key={img.id}
              src={img.image}
              alt={data.title}
              className="w-full max-h-96 object-contain rounded-lg border bg-gray-100 cursor-zoom-in"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
              onClick={() => setModalImage(img.image)}
            />
          )) : <div className="text-center text-gray-500">No Images</div>}
        </div>
      </div>
      {/* Modal Zoom Image */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
              onClick={() => setModalImage(null)}
              aria-label="Close preview"
            >
              ×
            </button>
            <img
              src={modalImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg border-2 border-white"
            />
          </div>
        </div>
      )}
    </div>
  );
} 