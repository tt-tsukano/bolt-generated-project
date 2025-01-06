import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Books } from './pages/Books';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
