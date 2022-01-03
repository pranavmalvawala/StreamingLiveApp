import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home"
import { Logout } from "./Logout";
import { SettingsPage } from "./admin/settings/SettingsPage"
import { Page } from "./Page"

export const Authenticated = () => (
  <Routes>
    <Route path="/admin/settings" element={<SettingsPage />} />
    <Route path="/login" element={<Navigate to="/" />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/pages/:churchId/:id" element={<Page />} />
    <Route path="/" element={<Home />} />

  </Routes>
)

