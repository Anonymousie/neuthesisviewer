import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/dashboard/UserDashboard";
import LibrarianDashboard from "./components/dashboard/LibrarianDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SuperAdminDashboard from "./components/dashboard/SuperAdminDashboard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            path="/dashboard/superadmin"
            element={<SuperAdminDashboard />}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
