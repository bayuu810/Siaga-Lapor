import React from 'react';
import { Outlet } from 'react-router-dom'; // Untuk merender konten child berdasarkan route
import SidebarPetugas from './SidebarPetugas';

const LayoutPetugas = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar kiri */}
      <SidebarPetugas />

      {/* Konten utama */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Konten yang akan berubah sesuai dengan routing */}
      </div>
    </div>
  );
};

export default LayoutPetugas;
