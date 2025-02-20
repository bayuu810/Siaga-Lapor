import React, { useState } from 'react';

function TambahKategori() {
  const [kategori, setKategori] = useState('');

  const handleChange = (e) => {
    setKategori(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the category can go here
    console.log('Kategori ditambahkan:', kategori);
  };

  return (
    <div className="p-4 w-64">
      <h2 className="text-xl mb-4 text-center">Tambah Kategori</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Nama Kategori</label>
          <input
            type="text"
            id="kategori"
            value={kategori}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Masukkan nama kategori"
          />
        </div>
        <button
          type="submit"
          className="mt-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          Tambah Kategori
        </button>
      </form>
    </div>
  );
}

export default TambahKategori;
