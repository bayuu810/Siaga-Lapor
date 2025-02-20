import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import useGetPengaduanByUser from "../hooks/useGetPengaduanByUser";
import { Button } from "../ui/button";

const Pengaduan = () => {
  useGetPengaduanByUser();
  const { pengaduanUser } = useSelector((store) => store.pengaduan);
  const navigate = useNavigate()
  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(pengaduanUser)
  // Fungsi untuk membuka modal
  const handleViewimage = (foto) => {
    setSelectedImage(foto);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">
        <div className="p-8">
          <div className="mb-6">
            <Link
              to="/form"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Buat Pengaduan
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 bg-white rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border border-gray-300">#</th>
                  <th className="text-left px-4 py-2 border border-gray-300">Judul Pengaduan</th>
                  <th className="text-left px-4 py-2 border border-gray-300">Isi Pengaduan</th>
                  <th className="text-left px-4 py-2 border border-gray-300">Status</th>
                  <th className="text-left px-4 py-2 border border-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengaduanUser && pengaduanUser.length > 0 ? (
                  pengaduanUser.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 border border-gray-300">{item.judul}</td>
                      <td className="px-4 py-2 border border-gray-300">{item.isi_pengaduan}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                      <div className="flex">
                      {item.foto ? (
                        <Button onClick={() => handleViewimage(item.foto)} variant='secondary'>Lihat Foto</Button>
                      ) : (
                        <span className="text-gray-500">Tidak ada foto</span>
                      )}
                      <Button
                        variant="link"
                        onClick={() => navigate(`/tanggapanUser/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Lihat Tanggapan
                      </Button>
                      </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Tidak ada pengaduan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal untuk menampilkan gambar */}
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
              >
                X
              </button>
              <img
                src={selectedImage}
                alt="Foto Pengaduan"
                className="max-w-lg max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pengaduan;
