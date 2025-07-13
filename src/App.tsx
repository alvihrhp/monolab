import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import ColorTest from "./components/ui/ColorTest";
import AdminLayout from "./components/layout/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Specs from "./pages/admin/Specs";
import Images from "./pages/admin/Images";
import Links from "./pages/admin/Links";
import DetailImage from "./pages/admin/DetailImage";
import UserImages from './pages/UserImages';
import UserLinks from './pages/UserLinks';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:slug" element={<GalleryDetail />} />
        <Route path="/colors" element={<ColorTest />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="specs" element={<Specs />} />
          <Route path="images" element={<Images />} />
          <Route path="images/:id" element={<DetailImage />} />
          <Route path="links" element={<Links />} />
        </Route>
        <Route path="/user-images/:id" element={<UserImages />} />
        <Route path="/user-links/:id" element={<UserLinks />} />
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
