import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getImageDetail, updateImage, deleteImageById } from "@/services/imagesService";

interface ProductImage {
  id: number;
  image: string;
}

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  content_type: string;
  created_at: string;
  images: ProductImage[];
}

function ImageDropBox({ files, setFiles }: { files: File[]; setFiles: (files: File[]) => void }) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };
  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-4"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Drag and drop your images here, or click to select files</p>
          <p className="text-xs text-gray-500">Supports multiple files</p>
        </div>
      </div>
      <div className="flex justify-center">
        <label htmlFor="dropzone-file-edit" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
          <span>Upload a file</span>
          <input id="dropzone-file-edit" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileSelect} />
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Selected Files:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {files.map((file, idx) => (
              <div key={file.name + file.size} className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-32 object-contain rounded-lg border border-gray-200 shadow-md bg-gray-100 mb-2"
                />
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  className="mt-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Failed to convert file to base64"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DetailImage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // Modal preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getImageDetail(id!);
        setData(res);
        setForm({ title: res.title, description: res.description });
      } catch (e) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    if (data) setForm({ title: data.title, description: data.description });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    setSaving(true);
    setError("");
    // Validation
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      setSaving(false);
      return;
    }
    try {
      let images: string[] | undefined = undefined;
      if (newFiles.length > 0) {
        // Convert all newFiles to base64
        images = await Promise.all(newFiles.map(fileToBase64));
      }
      await updateImage(id!, {
        title: form.title,
        description: form.description,
        ...(images ? { images } : {}),
      });
      // Refresh data
      const res = await getImageDetail(id!);
      setData(res);
      setEditMode(false);
      setNewFiles([]);
    } catch (e) {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  // Handler for deleting image
  const handleDeleteImage = async (imageId: number) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    setDeletingImageId(imageId);
    try {
      await deleteImageById(imageId);
      setData(d => d ? { ...d, images: d.images.filter(img => img.id !== imageId) } : d);
    } catch (e) {
      alert("Failed to delete image");
    } finally {
      setDeletingImageId(null);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-8 text-center">Not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="md:text-2xl text-1xl font-bold">Image Collection Detail</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            {editMode ? (
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <div className="text-lg font-semibold">{data.title}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            {editMode ? (
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px]"
              />
            ) : (
              <div className="text-gray-700">{data.description}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
            <div>{new Date(data.created_at).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        {editMode ? (
          <ImageDropBox files={newFiles} setFiles={setNewFiles} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.images && data.images.length > 0 ? (
              data.images.map(img => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.image}
                    alt="Gallery"
                    className="w-full h-40 object-contain rounded border shadow cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPreviewImage(img.image)}
                  />
                  {/* Trash icon overlay, only on hover */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteImage(img.id);
                    }}
                    disabled={deletingImageId === img.id}
                    title="Delete image"
                  >
                    {/* Trash SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {/* Loading overlay if deleting */}
                  {deletingImageId === img.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-xs">Deleting...</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-gray-400">No images</div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        {editMode ? (
          <>
            <button
              onClick={handleCancel}
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
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>
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
    </div>
  );
} 