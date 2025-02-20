import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Formm = () => {
  const navigate = useNavigate()
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        nik: '',
        email: '',
        phone: '',
        password: '',
        profile: null,
        role:'',
    });

    // Fungsi untuk menangani perubahan input teks
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menangani perubahan gambar
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
            setFormData({ ...formData, profile: file });
        }
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullname);
      formDataToSend.append("nik", formData.nik);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("no_telpon", formData.phone);
      formDataToSend.append("password", formData.password);
      if (formData.profile) {
          formDataToSend.append("profile_picture", formData.profile);
      }
      // Untuk menampilkan data FormData di konsol
for (let pair of formDataToSend.entries()) {
  console.log(pair[0] + ": " + pair[1]);
}
      try {
          const res = await axios.post(`${BACKEND_API_ENDPOINT}/register`, formDataToSend, {
              headers: { "Content-Type": "multipart/form-data" },
          });

          if (res.data.success) {
              navigate('/admin/pengguna')
              toast.success(res.data.message)
            }
      } catch (error) {
          console.log(error)
          if (error.response && error.response.data.error) {
            const errors = error.response.data.error
            Object.keys(errors).forEach((key) => {
              const errorMessages = errors[key]
              if (Array.isArray(errorMessages)) {
                // If errorMessages is an array, loop through and display each message
                errorMessages.forEach((msg) => toast.error(msg))
              } else {
                // If errorMessages is a string, directly display it
                toast.error(errorMessages)
              }
            })
          } else {
            toast.error('Terjadi kesalahan saat mengirim data.')
          }
      }
  };
    

    return (
        <div className="w-full p-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-700">Form Pengguna</h1>
            </div>

            {/* Tombol Kembali */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/admin/pengguna" className="text-yellow-400 hover:text-blue-800 text-sm px-4 py-2 border border-yellow-400 rounded-md">
                    Kembali
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label htmlFor="fullname" className="block text-black font-semibold mb-2">Nama</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Masukkan Nama"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="nik" className="block text-black font-semibold mb-2">NIK</label>
                    <input
                        type="text"
                        id="nik"
                        name="nik"
                        placeholder="Masukkan NIK"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        value={formData.nik}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-black font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Masukkan Email"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="phone" className="block text-black font-semibold mb-2">No Telepon</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Masukkan No Telepon"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-black font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Masukkan Password"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="profile" className="block text-black font-semibold mb-2">Profil</label>
                    <input
                        type="file"
                        id="profile"
                        name="profile"
                        accept="image/*"
                        className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onChange={handleImageChange}
                    />
                    {profileImage && (
                        <img src={profileImage} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full mx-auto" />
                    )}
                </div>

                {/* Pilihan Role */}
                <div className="mb-6">
                    <label htmlFor="role" className="block text-black font-semibold mb-2">Pilih Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-4 border rounded-md"
                        required
                    >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="petugas">Petugas</option>
                        <option value="masyarakat">Masyarakat</option>
                    </select>
                </div>

                {/* Tombol Simpan */}
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Formm;
