import React, { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetAllPengaduan from "../hooks/useGetAllPengaduan";
import { setPengaduan } from "@/redux/pengaduanSlice";
import { Button } from "../ui/button";

function LaporanMasuk() {
  useGetAllPengaduan()
  const {pengaduan} = useSelector((store)=>store.pengaduan)
  console.log(pengaduan)
    const { kategori } = useSelector((store) => store.kategori);
    const { lokasi } = useSelector((store) => store.lokasi);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
    const [filteredPengaduan, setFilteredPengaduan] = useState([]);
  
  const navigate = useNavigate()
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      console.log(newStatus)
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_API_ENDPOINT}/status/pengaduan/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
        
        // Update status pada state tanpa perlu fetch ulang
        setPengaduan(pengaduan.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        ));
      }
    } catch (error) {
      console.error("Gagal update status:", error.response?.data || error.message);
            toast.error("Gagal memperbarui status!");
    }
  };

  // Fungsi untuk memfilter data pengaduan
  const handleFilter = () => {
    const filtered = pengaduan.filter(item => {
      const matchesCategory = selectedCategory ? item.kategori_id === parseInt(selectedCategory) : true;
      const matchesLocation = selectedLocation ? item.lokasi_id === parseInt(selectedLocation) : true;
      return matchesCategory && matchesLocation;
    });
    setFilteredPengaduan(filtered);
  };

   useEffect(() => {
      handleFilter();
    }, [selectedCategory, selectedLocation]);
  
  return (
    <div className="p-4 bg-white w-full min-h-screen shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Daftar Pengaduan</h1>

      {/* Filter Kategori dan Lokasi */}
      <div className="mb-4 flex space-x-4">
      <select
            className="w-full border rounded p-3"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Semua Kategori</option>
            {kategori.map(category => (
              <option key={category.id} value={category.id}>{category.nama_kategori}</option>
            ))}
          </select>
          <select
            className="w-full border rounded p-3"
            onChange={(e) => setSelectedLocation(e.target.value)}
            value={selectedLocation}
          >
            <option value="">Semua Lokasi</option>
            {lokasi.map(location => (
              <option key={location.id} value={location.id}>{location.nama}</option>
            ))}
          </select>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Judul</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Isi Pengaduan</th>
            <th className="border border-gray-300 px-4 py-2 text-left">pelapor</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Lokasi</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredPengaduan.length > 0 ? (
            filteredPengaduan.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                <td className="border border-gray-300 px-4 py-2">{item.isi_pengaduan}</td>
                <td className="border border-gray-300 px-4 py-2">{item.user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.kategory.nama_kategori}</td>
                <td className="border border-gray-300 px-4 py-2">{item.lokasi.nama}</td>
                <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <div className="flex justify-center relative">
                    <Popover className="relative">
                      <Popover.Button className="focus:outline-none">
                        <CiMenuKebab className="cursor-pointer text-xl" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                          <div className="py-2 space-y-1">
                            <Link to="/petugas/Detailpetugas" className="block w-full px-4 py-2 hover:bg-gray-200 text-sm text-left">
                              Detail
                            </Link>
                            <Button
                        variant="link"
                        onClick={ () => handleUpdateStatus(item.id, 'diterima')}
                        className="justify-start text-sm text-gray-700"
                      >
                        Terima
                            </Button>
                             <Button
                            variant="link"
                            onClick={() => navigate(`/admin/tanggapanAdmin/${item.id}`)}
                            className="justify-start text-sm text-gray-700"
                          >
                            Lihat Tanggapan
                          </Button>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                </td>
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
  );
}

export default LaporanMasuk;
