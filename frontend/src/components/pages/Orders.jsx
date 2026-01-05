import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  // Tambahkan state untuk nama pelanggan (opsional, bisa hardcode atau input)
  const [customerName, setCustomerName] = useState("Pelanggan Umum");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + (item.harga * item.qty), 0);

  // --- FUNGSI BARU: SIMPAN KE TABEL PESANAN ---
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      // Menyusun data sesuai kolom tabel yang Anda lampirkan
      const orderData = {
        id: undefined, // ID akan di-generate oleh database
        pelanggan: customerName,
        // Menggabungkan nama-nama menu menjadi satu string untuk kolom 'pesanan'
        pesanan: cart.map(item => item.name).join(', '),
        // Menggabungkan qty menjadi string (misal: "2, 1")
        jumlah_pesanan: cart.map(item => item.qty).join(', '),
        // Mengambil harga satuan
        harga: cart.map(item => item.harga).join(', '),
        total_harga: totalPrice,
        status: 'Pending',
        waktu: new Date().toLocaleString('id-ID') // Format waktu lokal
      };

      const response = await axios.post('http://localhost:5000/orders', orderData);
      
      if (response.status === 200 || response.status === 201) {
        alert('Pesanan berhasil disimpan!');
        setCart([]); // Kosongkan keranjang setelah berhasil
      }
    } catch (error) {
      console.error("Gagal menyimpan pesanan:", error);
      alert('Terjadi kesalahan saat memesan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-orange-600">Warung Makan Digital</h1>
        <p className="text-gray-600 mt-2">Pilih menu lezat favorit Anda hari ini!</p>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sisi Kiri: Daftar Menu */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center col-span-2">Memuat menu...</p>
          ) : (
            menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                  {item.kategori}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{item.kategori}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.deskripsi}</p>
                  <p className="text-xs text-gray-400 mt-2">Stok: {item.stok}</p>
                  <p className="text-orange-500 font-semibold my-4">Rp {item.harga.toLocaleString()}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    disabled={item.stok <= 0}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                      item.stok > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.stok > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Sisi Kanan: Keranjang */}
        <aside className="w-full md:w-80 bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Keranjang Belanja</h2>
          
          {/* Input Nama Pelanggan */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">Nama Pelanggan:</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded p-2 text-sm outline-orange-500"
            />
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Belum ada pesanan.</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">{item.name}</p>
                      <p className="text-gray-500">{item.qty} x Rp {item.harga.toLocaleString()}</p>
                    </div>
                    <span className="font-bold text-gray-800">Rp {(item.harga * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-6 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rp {totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Pesan Sekarang
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Orders;