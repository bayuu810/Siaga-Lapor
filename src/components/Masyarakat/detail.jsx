import React from 'react';
import Navbar from './Navbar'; // Pastikan path benar
import wrs from '../../assets/wrs.png';
import { Link } from 'react-router-dom';

function Detail() {
  return (
    <div>
      {/* Navbar ditampilkan di bagian atas */}
      <Navbar />
      
      {/* Konten Halaman */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Bukti Foto */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Bukti Foto</h3>
        <img
          src={wrs} // Ganti dengan sumber foto yang sesuai
          alt="Bukti Pengaduan"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Detail Pengaduan */}
      <div className="space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Judul Pengaduan</h2>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Judul</h3>
          <p className="text-gray-600">Keributan</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Isi Pengaduan</h3>
          <p className="text-gray-600">Tadi malam ada pengeroyokan di daerah langensari</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Lokasi</h3>
          <p className="text-gray-600">
           Langensari
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Status</h3>
          <p className="text-gray-600"></p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Kategori</h3>
          <p className="text-gray-600">Kategori pengaduan...</p>
        </div>
      </div>

      {/* Tombol Kembali */}
      <div className="text-right mt-6">
        <Link to="/petugas/pengaduanpetugas" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Kembali</Link>
       
      </div>
    </div>
    </div>
  );
}

export default Detail;
