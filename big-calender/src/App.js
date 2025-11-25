import React from 'react';
import { StoreProvider } from './context/StoreContext';


export default function App() {
  return (
    <StoreProvider>
      <h1>Big calender</h1>
    </StoreProvider>
  );
}