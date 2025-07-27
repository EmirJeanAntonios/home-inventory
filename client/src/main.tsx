import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import "./index.css";
import AuthLayout from "./pages/auth/layout.tsx";
import Login from "./pages/auth/login.tsx";
import Signup from "./pages/auth/signup.tsx";
import Dashboard from "./pages/dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthRedirect from "./components/AuthRedirect.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/layout.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <AuthRedirect>
              <AuthLayout />
            </AuthRedirect>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
