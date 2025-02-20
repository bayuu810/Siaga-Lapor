import React from 'react'

const ProfileNav = () => {
  return (
    <div className="flex justify-between border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">Profil</h2>
          <div className="flex space-x-4">
            <button className="text-blue-500">Laporan</button>
            <button className="text-blue-500"> notivikasi</button>
            <button className="text-blue-500">edit profil</button>
            <button className="text-blue-500">edit password</button>
          </div>
        </div>
  )
}

export default ProfileNav