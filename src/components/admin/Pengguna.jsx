import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import useGetAllUser from "../hooks/useGetAllUser";

const Pengguna = () => {
  useGetAllUser();
  const [selectedRow, setSelectedRow] = useState(null);
  const { allUsers =[]} = useSelector((store) => store.auth);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Hitung jumlah halaman
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  
  // Data yang ditampilkan sesuai halaman
  const currentUsers = allUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Data Pengguna</h1>

      <div className="mb-6">
        <Link to="/admin/formm" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Data Pengguna
        </Link>
      </div>

      {/* Tabel Data Petugas */}
      <table className="w-full border-collapse border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3">#</th>
            <th className="border p-3">NIK</th>
            <th className="border p-3">Nama</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Role</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item, index) => (
            <tr key={item.id} className="text-center text-gray-700 hover:bg-gray-100 relative">
              <td className="border p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td className="border p-3">{item.nik}</td>
              <td className="border p-3">{item.name}</td>
              <td className="border p-3">{item.email}</td>
              <td className="border p-3">{item.role}</td>
              <td className="border p-3 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRow(selectedRow === item.id ? null : item.id);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <BsPencilSquare size={20} />
                </button>
                {selectedRow === item.id && (
                  <div className="absolute right-0 w-32 bg-white shadow-lg rounded-md p-2 border z-50">
                    <button className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-green-100 rounded-md">
                      Detail
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md">
                      Hapus
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allUsers.length)} of {allUsers.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="border px-3 py-2 rounded-l-md bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`border px-4 py-2 ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="border px-3 py-2 rounded-r-md bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pengguna;