import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login"
import { Home } from "./Home"
import { Page } from "./Page"

export const Unauthenticated = () => (
  <>
    <Routes>
      <Route path="/login/:token" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pages/:churchId/:id" element={<Page />} />
      <Route path="/admin/settings" element={<Navigate to="/" />} />
      <Route path="/admin" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </>
)
