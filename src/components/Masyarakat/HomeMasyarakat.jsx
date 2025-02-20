import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar"; // Pastikan komponen Navbar sudah dibuat
import { useSelector } from "react-redux";

const HomeMasyarakat = () => {
  const {user} = useSelector((store)=>store.auth);
  console.log(user)
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gray-800 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Selamat Datang di Pengaduan Masyarakat</h2>
          <p className="text-lg text-gray-300 mb-6">
            Laporkan masalah di sekitar Anda dengan cepat dan mudah!
          </p>
          <Link to="/form" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center">
            Laporkan Sekarang <ArrowRight className="ml-2" />
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto my-20 px-6 text-center">
        <h3 className="text-3xl font-bold mb-12">Fitur Utama</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Pelaporan Online", desc: "Laporkan masalah dengan bukti foto & deskripsi." },
            { title: "Pantau Status", desc: "Lihat perkembangan laporan Anda secara real-time." },
            { title: "Respon Cepat", desc: "Dapatkan tanggapan langsung dari pihak terkait." }
          ].map((item, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8">Apa Kata Masyarakat?</h3>
          <blockquote className="italic text-gray-600 max-w-2xl mx-auto">
            "Aplikasi ini sangat membantu saya dalam melaporkan masalah di lingkungan saya. Tanggapannya cepat!"
          </blockquote>
          <p className="mt-4 font-semibold">- Bayu Saputra</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-auto">
        <p>&copy; 2025 Pengaduan Masyarakat. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
};

export default HomeMasyarakat;
