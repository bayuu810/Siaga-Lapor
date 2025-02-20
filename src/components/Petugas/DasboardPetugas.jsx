import React from 'react';
import { FaUserShield } from 'react-icons/fa';

function DashboardPetugas() {
  return (
    <div className="p-10 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="w-full bg-white p-16 rounded-3xl shadow-2xl max-w-5xl min-h-[600px] transform hover:scale-105 transition duration-300">
        <FaUserShield className="text-blue-600 text-9xl mb-8 animate-bounce" />
        <h1 className="text-5xl font-extrabold text-blue-700 mb-8">
          Selamat Datang di <span className="text-indigo-600">SIAGA LAPOR</span>!
        </h1>
        <p className="text-2xl text-gray-700 font-medium leading-relaxed">
          Anda telah masuk sebagai <span className="font-semibold text-blue-500">Petugas</span>.  
          Jadilah garda terdepan dalam menangani laporan masyarakat, memastikan respons yang cepat,  
          dan menciptakan lingkungan yang lebih aman dan nyaman.
        </p>
        <p className="mt-10 text-xl text-gray-600 italic font-semibold">
          "Setiap laporan adalah langkah menuju perubahan. Mari bertindak dengan sigap dan tanggap!"
        </p>
      </div>
    </div>
  );
}

export default DashboardPetugas;
