import React, { useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import { toast } from 'sonner';
import { setKategori } from '@/redux/kategoriSlice';
import axios from 'axios';
import useGetAllKategori from '../hooks/useGetAllKategori';

function KategoriPengaduan() {
  useGetAllKategori()
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKategoriPengaduan, setNewKategoriPengaduan] = useState("");
  const [deskripsi, setDeskripsi] = useState(""); // State untuk deskripsi
  const { kategori } = useSelector((store) => store.kategori);
  console.log(kategori)

  const handleDeleteKategori = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Token dari localStorage
      const res = await axios.delete(`${BACKEND_API_ENDPOINT}/delete/kategori/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        Object.keys(errors).forEach((key) => {
          const errorMessages = errors[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((msg) => toast.error(msg));
          } else {
            toast.error(errorMessages);
          }
        });
      } else {
        toast.error('Terjadi kesalahan saat mengirim data.');
      }
    }
  };


// Cek apakah kategori adalah objek tunggal dan ubah menjadi array
const kategoriArray = Array.isArray(kategori) ? kategori : [kategori];
  const handleAddKategoriPengaduan = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_API_ENDPOINT}/add/kategori`,
        { 
          nama_kategori: newKategoriPengaduan,
          deskripsi: deskripsi // Tambahkan deskripsi ke request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        dispatch(setKategori(res.data.kategori));
        setNewKategoriPengaduan(""); // Reset input
        setDeskripsi(""); // Reset input deskripsi
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        Object.keys(errors).forEach((key) => {
          const errorMessages = errors[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((msg) => toast.error(msg));
          } else {
            toast.error(errorMessages);
          }
        });
      } 
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Data Kategori</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md"
        >
          + Tambah
        </button>
      </div>

      {/* Modal Tambah Kategori */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Tambah Kategori</h2>
            
            {/* Input Nama Kategori */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama Kategori</label>
              <input
                type="text"
                value={newKategoriPengaduan}
                onChange={(e) => setNewKategoriPengaduan(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan nama kategori"
              />
            </div>

            {/* Input Deskripsi */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan deskripsi kategori"
              />
            </div>

            {/* Tombol Modal */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleAddKategoriPengaduan}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Data Kategori */}
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-6 py-3 text-center">No</th>
            <th className="px-6 py-3">Nama Kategori</th>
            <th className="px-6 py-3">Deskripsi</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {kategoriArray.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-center">{index + 1}</td>
              <td className="px-6 py-4">{item.nama_kategori}</td>
              <td className="px-6 py-4">{item.deskripsi || '-'}</td>
              <td className="px-6 py-4 text-center relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={() => setOpenPopover(openPopover === item.id ? null : item.id)}
                      className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                      <CiMenuKebab />
                    </button>
                  </PopoverTrigger>
                  {openPopover === item.id && (
                    <PopoverContent
                      className="bg-white shadow-lg rounded-lg p-4 absolute right-0 mt-2 w-40"
                      style={{ zIndex: 999 }}
                    >
                      <div className="text-center">
                        <button
                          className="w-full text-red-600 hover:bg-red-100 rounded-lg py-2 transition duration-300 ease-in-out"
                          onClick={() => handleDeleteKategori(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KategoriPengaduan;
