import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useGetAllPengaduan from '../hooks/useGetAllPengaduan';
import { Label } from '../ui/label';

const GenerateLaporan = () => {
  useGetAllPengaduan();
  const { pengaduan } = useSelector((store) => store.pengaduan);
  const { kategori } = useSelector((store) => store.kategori);
  const { lokasi } = useSelector((store) => store.lokasi);

  const [filteredPengaduan, setFilteredPengaduan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Set data awal untuk filteredPengaduan
  useEffect(() => {
    setFilteredPengaduan(pengaduan);
  }, [pengaduan]);

  // Fungsi untuk memfilter data pengaduan
  const handleFilter = () => {
    const filtered = pengaduan.filter(item => {
      const formattedDate = item.created_at.split('T')[0];
      const matchesCategory = selectedCategory ? item.kategori_id === parseInt(selectedCategory) : true;
      const matchesLocation = selectedLocation ? item.lokasi_id === parseInt(selectedLocation) : true;
      const matchesStartDate = startDate ? new Date(formattedDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(formattedDate) <= new Date(endDate) : true;
      return matchesCategory && matchesLocation && matchesStartDate && matchesEndDate;
    });
    setFilteredPengaduan(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedLocation, startDate, endDate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Laporan Pengaduan', 14, 10);

    const tableColumn = ['No', 'Judul', 'Isi Pengaduan', 'Kategori', 'Lokasi', 'Status', 'Tanggal'];
    const tableRows = [];

    filteredPengaduan.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.judul,
        item.isi_pengaduan,
        item.kategory.nama_kategori,
        item.lokasi.nama,
        item.status,
        item.created_at.split('T')[0],
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('laporan_pengaduan.pdf');
  };

  console.log(kategori)
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Laporan Pengaduan</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Kategori */}
        <div className="w-full sm:w-1/3">
          <Label>Berdasarkan Kategori</Label>
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
        </div>

        {/* Lokasi */}
        <div className="w-full sm:w-1/3">
          <Label>Berdasarkan Lokasi</Label>
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

        {/* Tanggal Mulai */}
        <div className="w-full sm:w-1/3">
          <Label>Tanggal Mulai</Label>
          <input
            type="date"
            className="w-full border rounded p-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Tanggal Akhir */}
        <div className="w-full sm:w-1/3">
          <Label>Tanggal Akhir</Label>
          <input
            type="date"
            className="w-full border rounded p-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mb-6">
        <Button onClick={generatePDF} variant="default">Download PDF</Button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">No</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Judul</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Isi Pengaduan</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Lokasi</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengaduan.length > 0 ? (
              filteredPengaduan.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.isi_pengaduan}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.kategory.nama_kategori}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.lokasi.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.created_at.split('T')[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data pengaduan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateLaporan;
