import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-indigo-500 text-white p-6 rounded-lg cursor-pointer hover:bg-indigo-600" onClick={() => navigate("/admin/specs")}>
            <h3 className="text-xl font-semibold">Specs</h3>
            <p className="mt-2">For Museum Collections</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg cursor-pointer hover:bg-green-600" onClick={() => navigate("/admin/images")}>
            <h3 className="text-xl font-semibold">Images</h3>
            <p className="mt-2">For Images Collections</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg cursor-pointer hover:bg-yellow-600" onClick={() => navigate("/admin/links")}>
            <h3 className="text-xl font-semibold">Links</h3>
            <p className="mt-2">For Links Collections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
