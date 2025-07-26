import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import Login from "./pages/auth/login.tsx";
import Signup from "./pages/auth/signup.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);
