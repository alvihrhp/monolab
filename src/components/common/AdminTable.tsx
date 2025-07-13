import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface AdminTableProps {
  title: string;
  apiEndpoint: string;
  columns: string[];
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "number" | "textarea" | "date";
  }>;
  searchFields?: string[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

import ItemModal from "./ItemModal";
import ImageUploadModal from "./ImageUploadModal";

export default function AdminTable({
  title,
  apiEndpoint,
  columns,
  fields,
  onEdit,
  onDelete,
}: AdminTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    setIsModalOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: [apiEndpoint, searchTerm, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${apiEndpoint}?page=${currentPage}&limit=${itemsPerPage}${searchTerm ? `&search=${searchTerm}` : ""}`
      );
      return response.json();
    },
  });

  const totalPages = data?.totalPages || 1;
  const items = data?.items || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6 gap-4 sm:gap-8 flex-nowrap overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-xl">
          {title}
        </h2>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-2 py-1.5 rounded-lg hover:bg-blue-600 sm:px-4 sm:py-2 text-sm sm:text-base sm:w-[150px] md:w-fit-content"
        >
          Add New
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  No items found
                </td>
              </tr>
            ) : (
              items.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {item[column.toLowerCase()]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex justify-between flex-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {title === "Image Collections" ? (
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          apiEndpoint={apiEndpoint}
        />
      ) : (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Create ${title}`}
          apiEndpoint={apiEndpoint}
          fields={fields}
        />
      )}
    </div>
  );
}
