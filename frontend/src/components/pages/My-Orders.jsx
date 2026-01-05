import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan sudah install axios: npm install axios
import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data dari Backend saat komponen dimuat
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders'); // Ganti dengan URL API Anda
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
      setLoading(false);
    }
  };

  // 2. Fungsi untuk mengubah status pesanan ke database
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/${id}`, { status: newStatus });
      // Update state lokal agar tampilan langsung berubah
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ));
      alert("Status berhasil diperbarui");
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      alert("Gagal memperbarui status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Diproses': return 'bg-blue-100 text-blue-700';
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Dibatalkan': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1 h-full overflow-hidden">
        <Navbar />
        <div className="flex min-h-screen bg-gray-50">
          <main className="flex-1 p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Daftar Pesanan Masuk</h1>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
                Total Pesanan Hari Ini: <span className="text-orange-600 font-bold">{orders.length}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Pelanggan</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Pesanan</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Jumlah Pesanan</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total Harga</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Waktu</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan="7" className="text-center py-4">Memuat data...</td></tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4 text-gray-700">{order.pelanggan}</td> {/* Database: pelanggan */}
                          <td className="px-6 py-4 text-gray-500 text-sm">{order.pesanan}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{order.jumlah_pesanan}</td>
                          <td className="px-6 py-4 font-semibold">
                            Rp {Number(order.total_harga).toLocaleString()} {/* Database: total_harga */}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs">{order.waktu}</td> {/* Database: waktu */}
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <select 
                              onChange={(e) => updateStatus(order.id, e.target.value)}
                              className="text-xs border rounded p-1 outline-none focus:ring-2 focus:ring-orange-500"
                              value={order.status}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Diproses">Diproses</option>
                              <option value="Selesai">Selesai</option>
                              <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;