import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

function Profil() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    no_telpon: user?.no_telpon || '',
    profile_picture: null,
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleBack = () => {
    navigate('/')
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // Fungsi menyimpan perubahan profil
    const handleSave = async (id) => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('no_telpon', formData.no_telpon);
        if (formData.profile_picture) {
          formDataToSend.append('profile_picture', formData.profile_picture);
        }
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token tidak ditemukan!');
          return;
        }
        const response = await axios.post(`${BACKEND_API_ENDPOINT}/update/user/${id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Gagal memperbarui profil:', error);
      }
    };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_picture: file });
  };

  
  // Fungsi mengupdate password
  const handleUpdatePassword = async (id) => {
    try {
      if (!formData.current_password || !formData.password) {
        toast.message("Harap isi semua kolom password!");
        return;
      }

      const requestData = {
        current_password: formData.current_password,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }

      const response = await axios.post(`${BACKEND_API_ENDPOINT}/update/user/${id}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsModalPasswordOpen(false);
      } 
    } catch (error) {
      console.error('Gagal mengganti password:', error.response?.data || error.message);
      toast.message('Terjadi kesalahan saat mengganti password');
    }
  };

  // console.log(user)
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 w-[1200px] px-8">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={handleBack} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">Kembali</Button>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 flex items-center gap-8 mb-8">
          <img
            src={formData.profile_picture ? URL.createObjectURL(formData.profile_picture) : user?.profile_picture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name || "Nama Anda"}</h2>
            <p className="text-gray-600 text-lg">{user?.email || "Email tidak tersedia"}</p>
            <p className="text-gray-600 text-lg">{user?.no_telpon || "Nomor Telepon tidak tersedia"}</p>
          </div>
        </div>

        {/* Data Profil */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Informasi Akun</h3>
          <div className="space-y-6 text-gray-700">
            <div className="flex justify-between border-b pb-3 text-lg">
              <span className="font-medium">Nama</span>
              <span>{user?.name || "Tidak ada data"}</span>
            </div>
            <div className="flex justify-between border-b pb-3 text-lg">
              <span className="font-medium">Email</span>
              <span>{user?.email || "Tidak ada data"}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium">Nomor Telepon</span>
              <span>{user?.no_telpon || "Tidak ada data"}</span>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-6">
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-green-600 text-white px-6 py-2">Edit Profil</Button>
            <Button onClick={() => setIsModalPasswordOpen(true)} variant="outline" className="px-6 py-2">Ganti Password</Button>
          </div>
        </div>

        {/* Modal Ganti Password */}
        {isModalPasswordOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">Ganti Password</h2>
              <Input type="password" name="current_password" value={formData.current_password} onChange={handleChange} placeholder="Password Lama" className="w-full mb-2" />
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password Baru" className="w-full mb-2" />
            <Input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Konfirmasi Password" className="w-full mb-2" />
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsModalPasswordOpen(false)} variant="outline" className="px-5 py-2">Batal</Button>
                <Button onClick={() => handleUpdatePassword(user.id)}>Simpan</Button>   
                           </div>
            </div>
          </div>
        )}

        {/* Modal Edit Profil */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">Edit Profil</h2>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="w-full mb-4 p-3" />
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 p-3" />
              <Input type="text" name="no_telpon" value={formData.no_telpon} onChange={handleChange} placeholder="Nomor Telepon" className="w-full mb-4 p-3" />
              {/* Input Foto Profil */}
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded-lg mb-4"
              />
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-5 py-2">Batal</Button>
                <Button onClick={() => handleSave(user.id)}>Simpan</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil;