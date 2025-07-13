import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import ImageUploadModal from "@/components/common/ImageUploadModal";
import { useNavigate } from "react-router-dom";

interface ImageData {
  id: string;
  image: string;
  product: {
    id: string;
    title: string;
    description: string;
    content_type: string;
    created_at: string;
  };
}

interface ImagesResponse {
  data: ImageData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function Images() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Modal preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data, isLoading, refetch } = useQuery<ImagesResponse>({
    queryKey: ["images", searchTerm, currentPage],
    queryFn: async () => {
      const response = await api.get(`/images`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          search: searchTerm || undefined,
        },
      });
      return response.data;
    },
  });
  // Transform data for table
  const transformedData = {
    items: data?.data.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      upload_date: new Date(product.created_at).toLocaleDateString(),
      image: product.images && product.images.length > 0 ? product.images[0].image : null,
      images: product.images,
    })) || [],
    totalPages: data?.totalPages || 1,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(Number(id));
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/images/delete-all/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      refetch();
    } catch (e) {
      alert("Failed to delete collection");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    refetch(); // Refresh the data after modal closes
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6 gap-4 sm:gap-8 flex-nowrap overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-xl">
          Image Collections
        </h2>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-2 py-1.5 rounded-lg hover:bg-blue-600 sm:px-4 sm:py-2 text-sm sm:text-base sm:w-[150px] md:w-fit-content"
        >
          Add New
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">Loading...</td>
              </tr>
            ) : transformedData.items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">No images found</td>
              </tr>
            ) : (
              transformedData.items.map((item: any) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={e => {
                    // Prevent row click if delete button is clicked
                    if ((e.target as HTMLElement).closest("button")) return;
                    navigate(`/admin/images/${item.id}`);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.upload_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {transformedData.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data?.total || 0)} of {data?.total || 0} images
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm text-gray-700">
              Page {currentPage} of {transformedData.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === transformedData.totalPages}
              className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        apiEndpoint="/images"
      />

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setPreviewImage(null)}
              aria-label="Close preview"
            >
              ×
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[70vh] w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
            <div className="text-lg font-semibold mb-4">Are you sure?</div>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmDeleteId(null)}
                disabled={deleting}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
