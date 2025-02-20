import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Masyarakat/navbar';
import Pengaduan from './components/Masyarakat/Pengaduan';
import Profil from './components/Masyarakat/Profil';
import Form from './components/Masyarakat/form';
import Detail from './components/Masyarakat/detail';
import HomeMasyarakat from './components/Masyarakat/HomeMasyarakat'
import Layout from './components/admin/Layout';
import Dashboard from './components/admin/dashboard';
import Pengguna from './components/admin/Pengguna';
import Lokasi from './components/admin/Lokasi';
import KategoriPengaduan from './components/admin/KategoriPengaduan';
import LaporanMasuk from './components/admin/LaporanMasuk';
import GenerateLaporan from './components/admin/GenerateLaporan';
import Profiladmin from './components/admin/Profiladmin';
import FormPetugas from './components/admin/Formm';
import LayoutPetugas from './components/Petugas/LayoutPetugas';
import DasboardPetugas from './components/Petugas/DasboardPetugas';
import PengaduanPetugas from './components/Petugas/PengaduanPetugas';
import Detailpetugas from './components/Petugas/Detailpetugas';
import Tanggapan from './components/Petugas/Tanggapan';
import Lihattanggapan from './components/Petugas/Lihattanggapan';
import TambahKategori from './components/admin/TambahKategori';
import ProfilPetugas from './components/Petugas/ProfilPetugas';
import TentangKami from './components/Masyarakat/TentangKami';
import TanggapanUser from './components/Masyarakat/TanggapanUser';
import TanggapanAdmin from './components/admin/TanggapanAdmin';
import Formm from './components/admin/Formm';


const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <HomeMasyarakat />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/navbar',
      element: <Navbar />
    },
    {
      path: '/navbar',
      element: <Navbar />
    },
    {
      path: '/pengaduan',
      element: <Pengaduan />  
    },
    {
      path: '/profil',
      element: <Profil />
    },
    {
      path: '/form',
      element: <Form />
    },
    {
      path: '/detail',
      element: <Detail />
    },
    {
      path: '/homemasyarakat',
      element: <HomeMasyarakat />
    },
    {
      path: '/tentangkami',
      element: <TentangKami />
    },
    {
      path: '/tanggapanUser/:id',
      element: <TanggapanUser />
    },
    {
      path: '/admin',
      element: <Layout />, // Layout yang menyatukan Sidebar dan konten
      children: [
        {
          path: '/admin',
          element: <Dashboard />, // Halaman Home untuk petugas
        },
        {
          path: 'pengguna',
          element: <Pengguna />, // Halaman Home untuk petugas
        },
        {
          path: 'lokasi',
          element: <Lokasi />, // Halaman Home untuk petugas
        },
        {
          path: 'kategoripengaduan',
          element: <KategoriPengaduan />, // Halaman Home untuk petugas
        },
        {
          path: 'laporanmasuk',
          element: <LaporanMasuk />, // Halaman Home untuk petugas
        },
        {
          path: 'tanggapanAdmin/:id',
          element: <TanggapanAdmin />, // Halaman Home untuk petugas
        },
        {
          path: 'generatelaporan',
          element: <GenerateLaporan />, // Halaman Home untuk petugas
        },
        {
          path: 'profiladmin',
          element: <Profiladmin />, // Halaman Home untuk petugas
        },
        {
          path: 'formm',
          element: <Formm />, // Halaman Home untuk petugas
        },
        {
          path: 'tambahkategori',
          element: <TambahKategori />, // Halaman Home untuk petugas
        }
      ]
    },
    {
      path: '/petugas',
      element: <LayoutPetugas />,
      children: [
        {
          path: '/petugas',
          element: <DasboardPetugas />
        },
        {
          path: 'pengaduanpetugas',
          element: <PengaduanPetugas />
        },
        {
          path: 'detailpetugas',
          element: <Detailpetugas />
        },
        {
          path: 'tanggapan/:id',
          element: <Tanggapan />
        },
        {
          path: 'lihattanggapan/:id',
          element: <Lihattanggapan />
        },
        {
          path: 'profilpetugas',
          element: <ProfilPetugas />
        }
      ]
    }
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
