import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import { setLoading } from '@/redux/authSlice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ArrowLeft } from 'lucide-react';

const Tanggapan = () => {
  const { id } = useParams();//mengambil id dari param
  const { user } = useSelector((store)=>store.auth );
  const [tanggapan, setTanggapan] = useState(""); //untuk tanggapan
  const [foto, setFoto] = useState(null); //untuk foto (file)
  const userId = user.id; //simulasi userId dari auth (gunakan auth logic aslinya)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!tanggapan || !foto) {
      alert("Tanggapan dan foto harus diisi!");
      return;
    }

    // Siapkan data untuk dikirim
    const formData = new FormData();
    formData.append("tanggapan", tanggapan);
    formData.append("foto", foto);
    formData.append("userId", userId);
    formData.append("pengaduanId", id);

    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await axios.post(
        `${BACKEND_API_ENDPOINT}/add/tanggapan/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        navigate("/petugas/Pengaduanpetugas");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // Periksa apakah ada respons error dari server
      if (error.response) {
        const { message, error: errorData } = error.response.data;

        // Tampilkan pesan error dari server jika ada
        if (message) {
          toast.error(message); // Menampilkan pesan seperti "Tanggapan untuk pengaduan ini sudah ada"
        }

        // Jika ada error dalam bentuk objek (contoh validasi laravel)
        if (errorData) {
          Object.keys(errorData).forEach((key) => {
            const errorMessages = errorData[key];
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => toast.error(msg));
            } else {
              toast.error(errorMessages);
            }
          });
        }
      } else {
        // Jika tidak ada respons dari server
        toast.error("Terjadi kesalahan saat mengirim data.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };




  return (
    <div className="mt-4">
    {/* Tombol Kembali di pojok kiri */}
    <div className="text-left">
      <Link to="/petugas/Pengaduanpetugas" className="text-blue-600 font-bold cursor-pointer">
      <Button variant="link">
            <ArrowLeft /> Kembali
          </Button>
      </Link>
      <h2 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Memberi Tanggapan
        </h2>
    </div>
    
    <form onSubmit={handleSubmit}>
       {/* Judul "Memberi Tanggapan" di tengah */}
        <div className="mb-4">
         <Label
            htmlFor="tanggapan"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tanggapan
          </Label>
  
    {/* Input textarea untuk tanggapan */}
    <Textarea
            id="tanggapan"
            placeholder="Masukkan tanggapan..."
            className="resize-none h-52"
            value={tanggapan}
            onChange={(e) => setTanggapan(e.target.value)}
          />
          </div>
    {/* Input untuk mengunggah foto */}
    <div className="my-10">
    <label
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Foto
          </label>
      <Input
            type="file"
            id="foto"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />
    </div>

    <div className="mt-10">
    <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Kirim
          </Button>
    </div>
    </form>
  </div>  
  
  )
}

export default Tanggapan