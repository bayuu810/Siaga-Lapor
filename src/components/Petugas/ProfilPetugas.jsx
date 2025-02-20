import { Avatar } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { useSelector } from "react-redux";

function profilpetugas() {
  const [role, setRole] = useState("Petugas");
  const {user} = useSelector ((store) =>store.auth )

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Konten Profil, menyesuaikan sidebar */}
      <div className="flex-grow flex justify-center items-center p-10">
        <div className="bg-white shadow-lg p-10 w-full max-w-6xl border rounded-lg">
          <h1 className="text-4xl font-bold text-center text-blue-600 underline mb-8">
            Profil Petugas
          </h1>
          <div className="flex flex-col items-center">
            <Avatar>
            <AvatarImage src={user.profile_picture} alt="@shadcn" className="object-cover h-32 w-32 rounded-full" />
            </Avatar>
            <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div>
              <label className="font-bold">Nama Lengkap</label>
              <input
                type="text"
                className="border w-full p-4 mt-2 rounded text-lg"
                placeholder="Masukkan Nama"
              />
            </div>
            <div>
              <label className="font-bold">Email</label>
              <input
                type="email"
                className="border w-full p-4 mt-2 rounded text-lg"
                placeholder="Masukkan Email"
              />
            </div>
            <div>
              <label className="font-bold">Role</label>
              <select
                className="border w-full p-4 mt-2 rounded text-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Petugas">Petugas</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-3">
              <label className="font-bold">Password</label>
              <input
                type="password"
                className="border w-full p-4 mt-2 rounded text-lg"
                placeholder="Masukkan Password"
              />
            </div>
          </div>
          <button className="bg-blue-600 text-white font-bold p-4 mt-8 w-full text-lg rounded hover:bg-blue-700 transition">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

export default profilpetugas;
