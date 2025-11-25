import React from 'react';
import { StoreProvider } from './context/StoreContext';
import Dashboard from './components/DashBoard';
import './index.css'

export default function App() {
  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}