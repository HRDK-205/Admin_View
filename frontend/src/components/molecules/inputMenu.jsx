export default function MenuForm({ name, harga, kategori, stok, deskripsi, setName, setHarga, setKategori, setStok, setDeskripsi, editId, setEditId, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-5 text-gray-800">
        {editId ? "✏️ Edit Data Menu" : "➕ Tambah Data Menu"}
      </h3>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Nama Menu</label>
        <input
          type="text"
          placeholder="Masukkan Nama Menu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Harga</label>
        <input
          type="text"
          placeholder="Masukkan Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
        <input
          type="text"
          placeholder="Masukkan Kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Stok</label>
        <input
          type="text"
          placeholder="Masukkan Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
        <textarea
          placeholder="Masukkan Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
          rows="4" // Menentukan tinggi box (jumlah baris)
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
        />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition font-medium">
          {editId ? "Update" : "Simpan"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => { setEditId(null); setName(""); setHarga(""); setKategori(""); setStok(""); setDeskripsi(""); }}
            className="flex-1 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition font-medium"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}