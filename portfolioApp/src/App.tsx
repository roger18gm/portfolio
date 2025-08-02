import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./Layout";
import { Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import axios from "axios";
import { AuthProvider } from "./context/authContext";
import styles from "./app.styles";
import NotFoundPage from "./pages/NotFoundPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null;

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "work", element: <WorkPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <Box sx={styles.appMargin}>
        <RouterProvider router={router} />
      </Box>
    </AuthProvider>
  );
}

export default App;
