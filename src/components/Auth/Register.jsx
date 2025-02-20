import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_API_ENDPOINT } from '@/constant/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Register() {
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors]= useState({});
    const [formData, setFormData] = useState({
        fullname: '',
        nik: '',
        email: '',
        phone: '',
        password: '',
        profile: null,
    });

    const validate = () => {
        let newErrors = {};
        if (!formData.fullname.trim()) newErrors.fullname = "Nama harus diisi";
        if (!formData.nik.trim()) newErrors.nik = "NIK harus diisi";
        else if (!/^[0-9]+$/.test(formData.nik)) newErrors.nik = "NIK harus berupa angka";
        if (!formData.email.trim()) newErrors.email = "Email harus diisi";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Format email tidak valid";
        if (!formData.phone.trim()) newErrors.phone = "No Telepon harus diisi";
        else if (!/^[0-9]+$/.test(formData.phone)) newErrors.phone = "No Telepon harus berupa angka";
        if (!formData.password.trim()) newErrors.password = "Password harus diisi";
        else if (formData.password.length < 6) newErrors.password = "Password minimal 6 karakter";
        
        setErrors(newErrors);
    
        console.log(errors); // Debugging error yang muncul
    
        return Object.keys(newErrors).length === 0;
    };
    
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
            setFormData({ ...formData, profile: file });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate();  // Panggil validasi setiap kali ada perubahan input
    };
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        if (!validate()) {
            console.log("Validasi Gagal")
         return;   
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.fullname);
        formDataToSend.append("nik", formData.nik);
        formDataToSend.append("email", formData.email);
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
                navigate('/login')
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
        <div className='flex items-center justify-center min-h-screen bg-gray-200'>
            <div className='p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl'>
                <h2 className='text-3xl font-bold mb-4 text-center text-gray-800'>Daftar Akun</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label htmlFor="fullname" className='block text-black font-semibold mb-2'>Nama</label>
                        <input 
                            type="text"
                            id='fullname'
                            name='fullname'
                            placeholder='Masukkan Nama'
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            required
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="nik" className='block text-black font-semibold mb-2'>NIK</label>
                        <input 
                            type="text"
                            id='nik'
                            name='nik'
                            placeholder='Masukkan NIK'
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            required
                            value={formData.nik}
                            onChange={handleChange}
                        />
                        {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}

                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email" className='block text-black font-semibold mb-2'>Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Masukkan Email'
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    </div>
                    <div className='mb-6'>
                        <label htmlFor="phone" className='block text-black font-semibold mb-2'>No Telepon</label>
                        <input 
                            type="text"
                            id='phone'
                            name='phone'
                            placeholder='Masukkan No Telepon'
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password" className='block text-black font-semibold mb-2'>Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Masukkan Password'
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="profile" className='block text-black font-semibold mb-2'>Profil</label>
                        <input 
                            type="file"
                            id='profile'
                            name='profile'
                            accept="image/*"
                            className='w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            onChange={handleImageChange}
                        />
                        {profileImage && (
                            <img src={profileImage} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full mx-auto" />
                        )}
                    </div>
                    <button 
                        type="submit"
                        className="w-full my-4 bg-blue-500 text-white rounded-lg py-3 px-4 text-lg font-semibold hover:bg-blue-600">
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
