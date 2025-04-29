import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { EditTaskPage } from "./pages/EditTaskPage";
import ProtectedRoute from "../src/auth/ProtectedRoute";
import { DeleteTaskPage } from "./pages/DeleteTaskPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateTaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <ProtectedRoute>
        <EditTaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/delete/:id",
    element: (
      <ProtectedRoute>
        <DeleteTaskPage />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <LoginPage /> },
]);
