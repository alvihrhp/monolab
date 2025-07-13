import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "@/services/imagesService";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiEndpoint: string;
}

export default function ImageUploadModal({
  isOpen,
  onClose,
  apiEndpoint,
}: ImageUploadModalProps) {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [convertingFiles, setConvertingFiles] = useState<string[]>([]);
  const [base64Images, setBase64Images] = useState<{ [key: string]: string }>(
    {}
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const uploadMutation = useMutation({
    mutationFn: async (data: { title: string; description: string; images: string[] }) => {

      return uploadImages({ ...data, apiEndpoint });
    },
    onSuccess: () => {
      onClose();
      navigate(0); // Refresh the page after successful upload
    },
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const convertFiles = async () => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const key = file.name + file.size;
        if (!base64Images[key] && !convertingFiles.includes(key)) {
          setConvertingFiles((prev) => [...prev, key]);
          convertToBase64(file)
            .then(
              (base64) => {
                setBase64Images((prev) => ({
                  ...prev,
                  [key]: base64,
                }));
              },
              (error) => {
                console.error(`Failed to convert ${key} to base64`, error);
              }
            )
            .finally(() => {
              setConvertingFiles((prev) => prev.filter((name) => name !== key));
            });
        }
      }
    };

    convertFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleUpload = async () => {
    if (!title.trim() || !description.trim() || files.length === 0) {
      setErrorMessage("Title, description, and at least one image are required.");
      return;
    }
    setErrorMessage("");
    // Siapkan array base64
    const images = Object.values(base64Images);
    // Siapkan body sesuai backend
    const body = {
      title,
      description,
      images,
    };
    // Panggil API
    uploadMutation.mutate(body);
  };

  if (!isOpen) return null;

  return (
    <>
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow">
            {errorMessage}
          </div>
        </div>
      )}
      {/* Modal as usual */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Upload Images</h2>

              {/* Input Title & Description */}
              <div className="mb-6 space-y-4">
                <div>
                  <label htmlFor="image-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="image-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter image title"
                  />
                </div>
                <div>
                  <label htmlFor="image-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="image-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px]"
                    placeholder="Enter image description"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          Drag and drop your images here, or click to select files
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports multiple files
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Selected Files:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {files.map((file, index) => {
                        const key = file.name + file.size;
                        return (
                          <div key={key} className="flex flex-col items-center">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                              {base64Images[key] ? (
                                <img
                                  src={base64Images[key]}
                                  alt={file.name}
                                  className="w-full h-32 object-contain rounded-lg border border-gray-200 shadow-md bg-gray-100"
                                  style={{ zIndex: 1, position: 'relative' }}
                                />
                              ) : convertingFiles.includes(key) ? (
                                <div className="relative w-full h-32 rounded-lg bg-gray-100 border-4 border-blue-500 flex items-center justify-center">
                                  <div className="flex flex-col items-center">
                                    <svg
                                      className="animate-spin h-8 w-8 text-blue-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-500">Converting...</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-full h-32 rounded-lg bg-gray-100 border-4 border-blue-500" />
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setFiles(files.filter((_, i) => i !== index));
                              }}
                              className="mt-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
