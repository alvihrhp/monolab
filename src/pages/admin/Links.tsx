import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { createLink, updateLink, deleteLink } from "@/services/LinksService";

interface LinkData {
  id: number;
  title: string;
  description: string;
  created_at: string;
  links: { id: number; url: string }[];
}

interface LinksResponse {
  data: LinkData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function Links() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", url: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; product_id: number } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data, isLoading, refetch } = useQuery<LinksResponse>({
    queryKey: ["links", searchTerm, currentPage],
    queryFn: async () => {
      const response = await api.get(`/links`, {
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
    items:
      data?.data.map((product: any) => ({
        id: product.id,
        title: product.title,
        url: product.links && product.links.length > 0 ? product.links[0].url : "-",
        linkId: product.links && product.links.length > 0 ? product.links[0].id : null,
        description: product.description,
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

  const handleCreate = () => {
    setIsModalOpen(true);
    setError("");
    setEditId(null);
    setEditProductId(null);
    setForm({ title: "", description: "", url: "" });
  };
  const handleEdit = (item: any) => {
    if (!item.linkId || item.url === "-") {
      alert("Cannot edit: This entry has no link data.");
      return;
    }
    setIsModalOpen(true);
    setError("");
    setEditId(item.linkId);
    setEditProductId(item.id);
    setForm({
      title: item.title,
      description: item.description || "",
      url: item.url,
    });
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setForm({ title: "", description: "", url: "" });
    setError("");
    setEditId(null);
    setEditProductId(null);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    setSaving(true);
    setError("");
    if (!form.title.trim() || !form.url.trim()) {
      setError("Title and Link are required.");
      setSaving(false);
      return;
    }
    try {
      if (editId !== null && editProductId !== null) {
        await updateLink(editId, {
          title: form.title,
          description: form.description,
          product_id: editProductId,
          url: form.url,
        });
      } else {
        await createLink({ title: form.title, description: form.description, url: form.url });
      }
      setIsModalOpen(false);
      setForm({ title: "", description: "", url: "" });
      setEditId(null);
      setEditProductId(null);
      refetch();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save link");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = (item: any) => {
    if (!item.linkId) return;
    setConfirmDelete({ id: item.linkId, product_id: item.id });
  };
  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteLink(confirmDelete.id, confirmDelete.product_id);
      setConfirmDelete(null);
      refetch();
    } catch (e) {
      alert("Failed to delete link");
    } finally {
      setDeleting(false);
    }
  };
  const handleCancelDelete = () => setConfirmDelete(null);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6 gap-4 sm:gap-8 flex-nowrap overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-xl">
          Link Collections
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
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by url..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">Loading...</td>
              </tr>
            ) : transformedData.items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No links found</td>
              </tr>
            ) : (
              transformedData.items.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 underline">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(item);
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data?.total || 0)} of {data?.total || 0} links
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col">
            <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Link" : "Add New Link"}</h2>
            {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter title"
                disabled={saving}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px]"
                placeholder="Enter description"
                disabled={saving}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                name="url"
                type="text"
                value={form.url}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter link URL"
                disabled={saving}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={saving}
              >
                {saving ? (editId ? "Saving..." : "Saving...") : (editId ? "Save" : "Save")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
            <div className="text-lg font-semibold mb-4">Are you sure?</div>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCancelDelete}
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
