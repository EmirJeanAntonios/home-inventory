import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import AuthLayout from "./pages/auth/layout.tsx";
import Login from "./pages/auth/login.tsx";
import Signup from "./pages/auth/signup.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
