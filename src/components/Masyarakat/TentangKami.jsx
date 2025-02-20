import React from 'react';
import Navbar from "./Navbar";

function TentangKami() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Tentang Kami</h1>
        <p className="text-lg text-center mb-4">
        <span className="text-blue-500 text-2xl font-bold">SIAGA LAPOR</span> adalah platform pengaduan masyarakat yang bertujuan untuk
           memberikan kemudahan dalam menyampaikan aspirasi dan keluhan kepada pihak
          berwenang dengan transparan dan akuntabel.
       </p>

        <p className="text-lg text-center mb-4">
          Kami berkomitmen untuk menciptakan lingkungan yang lebih transparan dan responsif terhadap
          kebutuhan masyarakat dengan menyediakan sistem yang cepat, aman, dan efisien.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Visi</h2>
        <p className="text-lg mb-4">
          Menjadi platform terpercaya dalam menampung aspirasi masyarakat guna meningkatkan kualitas
          layanan publik.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Misi</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Menyediakan akses mudah bagi masyarakat untuk menyampaikan pengaduan.</li>
          <li>Menjamin transparansi dalam penanganan laporan.</li>
          <li>Meningkatkan kolaborasi antara masyarakat dan pemerintah dalam penyelesaian masalah.</li>
        </ul>
      </div>
    </div>
  );
}

export default TentangKami;
