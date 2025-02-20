import React, { useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSelector } from 'react-redux';
import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import axios from 'axios';
import { setLokasi } from '@/redux/lokasiSlice';
import { toast } from 'sonner';
import useGetAllLokasi from '../hooks/useGetAllLokasi';

function Lokasi() {
  useGetAllLokasi()
  const {user} = useSelector((store)=>store.auth);
  console.log(user)
  const [openPopover, setOpenPopover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLokasi, setNewLokasi] = useState("");
 const {lokasi}=useSelector((store)=>store.lokasi);
 console.log(lokasi);


 const handleDeleteLokasi = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Token dari localStorage
    const res = await axios.delete(`${BACKEND_API_ENDPOINT}/delete/lokasi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(setLokasi(res.data.lokasi))
      await fetchLokasi(); // Refresh data kategori setelah penambahan
    }
  } catch (error) {
    console.log(error)
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

  const handleAddLokasi = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const res = await axios.post(
        `${BACKEND_API_ENDPOINT}/add/lokasi`,
        { nama: newLokasi },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        dispatch(setLokasi(res.data.lokasi))
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
        <h1 className="text-lg font-bold">Data Lokasi</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md"
        >
          + Tambah
        </button>
      </div>

      {/* Modal for Adding Location */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Tambah Lokasi</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="lokasi">
                Nama Lokasi
              </label>
              <input
                type="text"
                id="lokasi"
                value={newLokasi}
                onChange={(e) => setNewLokasi(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan nama lokasi"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleAddLokasi}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-6 py-3 text-center">No</th>
            <th className="px-6 py-3">Nama Lokasi</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lokasi.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-center">{index + 1}</td>
              <td className="px-6 py-4">{item.nama}</td>
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
                          onClick={() => handleDeleteLokasi(item.id)}
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

export default Lokasi;
