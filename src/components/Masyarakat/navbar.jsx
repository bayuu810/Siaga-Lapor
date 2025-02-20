import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, NotebookText, Settings } from "lucide-react";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { setPengaduanUser } from "@/redux/pengaduanSlice";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {user}=useSelector((store)=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BACKEND_API_ENDPOINT}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setUser(null)); 
        dispatch(setPengaduanUser(null)); 
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
};
  console.log(user)
  return (
    <div>
    <div className="bg-gradient-to-r from-purple-600 to-red-500 px-8 py-4 flex items-center justify-between shadow-lg rounded-b-lg">
  <h1 className="text-white text-2xl font-extrabold tracking-wide drop-shadow-md">
    SIAGA LAPOR
  </h1>

  {/* Menu utama di tengah */}
  <div className="flex-grow flex justify-center space-x-6">
    <Link to="/homemasyarakat" className="text-white hover:text-gray-300">
      Home
    </Link>
    <Link to="/pengaduan" className=" text-white hover:text-gray-300">
      Pengaduan
    </Link>
    <Link to="/tentangkami" className=" text-white hover:text-gray-300">
      Tentang Kami
    </Link>
  </div>

  {/* Profil dengan pop-up */}
  <div className="relative">
    { !user ? (
      <div className="flex items-center gap-2">
        <Link to="/login"><Button variant="outline">Masuk</Button></Link>
        <Link to="/register"><Button className="bg-blue-600 hover:bg-blue-700">Daftar</Button></Link>
      </div>
    ) : (
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2">
            <h1 className="font-medium">{user.name}</h1>
            <Avatar>
              <AvatarImage src={user.profile_picture} alt="@shadcn" className="object-cover" />
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gray-200">
          <div>
            <div className="flex gap-2 space-y-2">
              <Avatar>
                <AvatarImage src={user.profile_picture} alt="@shadcn" className="object-cover" />
              </Avatar>
            </div>
            <div className="flex flex-col my-2 text-gray-600">
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <Settings/>
                <Link to='/profil'>
                  <Button variant="Link">Pengaturan</Button>
                </Link>
              </div>
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <LogOut/>
                <Button variant="Link" onClick={logoutHandler}>Keluar</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )}
  </div>
</div>

    </div>
  );
};

export default Navbar;
