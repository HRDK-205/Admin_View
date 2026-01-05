import React, { useState } from 'react';

export default function MenuTable({ menu, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Logika Filter: Mencari berdasarkan Nama atau Kategori
  const filteredMenu = menu.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mt-6">
      {/* Input Pencarian */}
      <div className="w-full px-4 md:px-8 mb-4 flex justify-end">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Cari menu atau kategori..."
            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Stok</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500 italic">
                  Data tidak ditemukan...
                </td>
              </tr>
            ) : (
              filteredMenu.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-3 text-center">{item.id}</td>
                  <td className="p-3 font-medium text-gray-800">{item.name}</td>
                  <td className="p-3 text-blue-600 font-semibold">Rp. {item.harga.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="p-3">{item.stok}</td>
                  <td className="p-3 text-gray-600 text-sm truncate max-w-[150px]">
                    {item.deskripsi}
                  </td>
                  <td className="p-3 flex">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 mr-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Info jumlah data yang ditemukan */}
      <div className="md:px-4 mb-2 mt-2 text-sm text-gray-500">
        Menampilkan {filteredMenu.length} dari {menu.length} menu
      </div>
    </div>
  );
}