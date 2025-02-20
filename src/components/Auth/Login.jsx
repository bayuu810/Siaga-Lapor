import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import { setLoading, setUser } from '@/redux/authSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

function Login() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email:"",
    password:"",
  })
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value })
  }
  const dispatch = useDispatch()
  const {loading} = useSelector(store=>store.auth)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Code to handle form submission
    try {
      console.log(input)
      console.log(BACKEND_API_ENDPOINT)
      dispatch(setLoading(true))
        const res = await axios.post(`${BACKEND_API_ENDPOINT}/login`, input,{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          
        })
        console.log(res)

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          console.log(res.data.token)
          dispatch(setUser(res.data.user));
          if(res.data.user.role === 'masyarakat') {
            navigate('/')
          }
          if(res.data.user.role === 'petugas') {
            navigate('/petugas')
          }
          if(res.data.user.role === 'admin') {
            navigate('/admin')
          }
        
          toast.success(res.data.message)
        }
    } catch (error) {
      console.log(error);
      // Periksa apakah ada respons error dari server
      if (error.response) {
        const { message, error: errorData } = error.response.data;
        // Tampilkan pesan error dari server jika ada
        if (message) {
          toast.error(message);
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
      dispatch(setLoading(false))
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center px-10">
      <div className="p-12 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Input Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={input.email} name='email' onChange={changeEventHandler}
              placeholder="Masukkan Email"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
          {/* Input Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password} name='password' onChange={changeEventHandler}
              placeholder="Masukkan Password"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
          {/* Lupa Password */}
         
          {/* Tombol Login */}
          <div className="flex flex-col space-y-4">
           {loading ? (
          <Button className="w-full py-3 rounded-full flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Tunggu sebentar...
          </Button>
           ) : (
          <>
           <Button type="submit" className="w-full py-3 rounded-full bg-black text-white font-bold hover:bg-gray-600">
               Masuk
            </Button>
            <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="mx-4 text-sm text-gray-800">Pilih Opsi daftar untuk membuat akun</span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div>
          <Link
  to="/register"
  className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-800 text-white text-center block"
>
  Daftar
</Link>

    </>
  )}
</div>
        
        </form>
      </div>
    </div>
  );
}

export default Login;
