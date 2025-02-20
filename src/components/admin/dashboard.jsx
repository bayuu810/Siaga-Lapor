import React, { Fragment, useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaUsers, FaClipboardList, FaMapMarkerAlt, FaBell } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import { Transition } from "@headlessui/react";
import { setKategori } from "@/redux/kategoriSlice";
import useGetAllPengaduan from "../hooks/useGetAllPengaduan";
import useGetAllKategori from "../hooks/useGetAllKategori";
import useGetAllLokasi from "../hooks/useGetAllLokasi";

const Dashboard = () => {
  useGetAllPengaduan()
  useGetAllKategori()
  useGetAllLokasi()
const {pengaduan = []} = useSelector((store)=>store.pengaduan);
const {allUsers = []} = useSelector((store)=>store.auth);
const {lokasi = []} = useSelector((store)=>store.lokasi)
console.log(allUsers)
const [filteredData, setFilteredData] = useState([]);

  // Set data awal untuk filteredPengaduan
  useEffect(() => {
    setFilteredData(pengaduan);
  }, [pengaduan]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>

    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <FaUsers className="text-blue-500 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Pengguna</h3>
            <p className="text-gray-600">{allUsers.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <FaClipboardList className="text-green-500 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Pengaduan</h3>
            <p className="text-gray-600">{filteredData.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <FaMapMarkerAlt className="text-red-500 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Lokasi</h3>
            <p className="text-gray-600">{lokasi.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <FaBell className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">kategori</h3>
            <p className="text-gray-600">4</p>
          </div>
        </div>
      </div>

      {/* Tabel Laporan */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Laporan Data Masuk</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <label className="text-sm text-gray-600">
          Show 
          <select className="border mx-2 p-2 rounded-md text-gray-700">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          Entries
        </label>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md text-gray-700"
        />
      </div>

      <table className="w-full border-collapse border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3">#</th>
            <th className="border p-3">Judul</th>
            <th className="border p-3">Isi Pengaduan</th>
            <th className="border p-3">Pelapor</th>
            <th className="border p-3">Kategori</th>
            <th className="border p-3">Lokasi</th>
            <th className="border p-3">Status</th>
          </tr>
           </thead>
        <tbody>
               {filteredData.length > 0 ? (
                 filteredData.map((item, index) => (
                   <tr key={item.id} className="border-b border-gray-300">
                     <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.isi_pengaduan}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.user.name}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.kategory.nama_kategori}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.lokasi.nama}</td>
                     <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="7" className="text-center text-gray-500 py-4">
                     Tidak ada data
                   </td>
                 </tr>
               )}
             </tbody>
      </table>
    </div>
    </div>
  );
};

export default Dashboard;
