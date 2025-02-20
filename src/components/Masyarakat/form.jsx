import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllKategori from "../hooks/useGetAllKategori";
import useGetAllLokasi from "../hooks/useGetAllLokasi";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import axios from "axios";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";

const FormPengaduan = () => {
  useGetAllKategori();
  useGetAllLokasi();

  const { user } = useSelector((store) => store.auth);
  const { kategori } = useSelector((store) => store.kategori);
  const { lokasi } = useSelector((store) => store.lokasi);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    judul: "",
    isi_pengaduan: "",
    foto: null,
    lokasi_id: "",
    kategori_id: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, foto: e.target.files?.[0] });
  };

  const selectChangeHandler = (value, type) => {
    setInput({ ...input, [type]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("judul", input.judul);
    formData.append("isi_pengaduan", input.isi_pengaduan);
    formData.append("lokasi_id", input.lokasi_id);
    formData.append("kategori_id", input.kategori_id);
    if (input.foto) {
      formData.append("foto", input.foto);
    }
    console.log(input.lokasi_id)

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Anda harus login untuk membuat pengaduan.");
        return;
      }
      setLoading(true);
      const res = await axios.post(`${BACKEND_API_ENDPOINT}/add/pengaduan`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(res)
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg">
          <Link to="/pengaduan" className="inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-4">
            ← Kembali
          </Link>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Formulir Pengaduan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='my-2'>
              <Label>Judul</Label>
              <Input type='text' value={input.judul} name='judul' onChange={changeEventHandler} placeholder='Masukan judul pengaduan'/>
            </div>
            <div className='my-2'>
              <Label>Isi Pengaduan</Label>
              <Input type='text' value={input.isi_pengaduan} name='isi_pengaduan' onChange={changeEventHandler} placeholder='Masukan isi pengaduan'/>
            </div>
            <div className="my-2">
              <Label>Kategori</Label>
              <Select onValueChange={(value) => selectChangeHandler(value, 'kategori_id')}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50">
                  <SelectGroup>
                    {kategori.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>{item.nama_kategori}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="my-2">
              <Label>Lokasi</Label>
              <Select onValueChange={(value) => selectChangeHandler(value, 'lokasi_id')}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50">
                  <SelectGroup>
                    {lokasi.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>{item.nama}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='my-2'>
              <Label>Foto</Label>
              <Input accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer'/>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPengaduan;