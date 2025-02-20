import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Home, User, Tag, FileText, FilePlus, UserCircle, ClipboardList, Menu, X, ChevronDown, LogOut, ShieldAlert } from "lucide-react";
import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const {user} = useSelector((store)=>store.auth  )
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const res = await axios.post(`${BACKEND_API_ENDPOINT}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setUser(null)); 
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
};

  return (
    <div className="flex">
      {/* Button untuk toggle sidebar */}
      <button
        className="p-4 focus:outline-none md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-64 shadow-lg`}
      >
        <div>
          {/* Judul Aplikasi */}
          <div className="flex items-center p-4 text-lg font-bold border-b border-gray-700">
            <ShieldAlert className="mr-2" size={24} /> Siaga Lapor
          </div>
          
          <nav className="mt-6">
            <ul>
              {/* Master Data */}
              <li>
                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMasterOpen(!isMasterOpen)}
                >
                  <span className="flex items-center">
                    <ClipboardList className="mr-2" size={20} /> Master Data
                  </span>
                  <ChevronDown className={`transition-transform ${isMasterOpen ? "rotate-180" : ""}`} size={20} />
                </button>
                {isMasterOpen && (
                  <ul className="ml-6 border-l border-gray-600">
                    <li>
                      <Link to="/admin" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                        <Home className="mr-2" size={20} /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/pengguna" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                        <User className="mr-2" size={20} /> Pengguna
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/lokasi" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                        <FaMapMarkerAlt className="mr-2" /> Lokasi
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/kategoripengaduan" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                        <Tag className="mr-2" size={20} /> Kategori Pengaduan
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Laporan Masuk */}
              <li>
                <Link to="/admin/laporanmasuk" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                  <FileText className="mr-2" size={20} /> Laporan Masuk
                </Link>
              </li>
              <li>
                <Link to="/admin/generatelaporan" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                  <FilePlus className="mr-2" size={20} /> Generate Laporan
                </Link>
              </li>

              {/* Profil Admin */}
              {/* <li>
                <Link to="/admin/profiladmin" className="flex items-center p-4 hover:bg-gray-700 rounded-lg">
                  <UserCircle className="mr-2" size={20} /> Profil
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="absolute bottom-4 left-4 w-[90%]">
          <div className="border-t border-gray-700 py-4"></div>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.profile_picture} alt="@shadcn" className="object-cover" />
            </Avatar>
           <div className="flex-col">
           <p className="text-sm">{user.name}</p>
           <p className="text-sm">{user.email}</p>
           </div>
          </div>
          <button onClick={logoutHandler} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center mt-4">
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;