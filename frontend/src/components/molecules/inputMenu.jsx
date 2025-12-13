import { useEffect, useState } from "react";

export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
    const res = await fetch("http://localhost:5000/menu");
    const data = await res.json();
    setMenu(data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`http://localhost:5000/menu/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } else {
      await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    setName("");
    setEditId(null);
    fetchData();
    };

    const handleDelete = async (id) => {
    if (!window.confirm("Hapus data ini?")) return;
    await fetch(`http://localhost:5000/menu/${id}`, {
        method: "DELETE",
    });
    fetchData();
    };

  return (
    <div className="p-2 font-sans">
      <h2 className="text-2xl font-bold mb-5">
      </h2>
      {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-8 w-full  bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-5 text-gray-800">
                {editId ? "✏️ Edit Data Menu" : "➕ Tambah Data Menu"}
            </h3>
            {/* INPUT */}
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Menu
                </label>
                <input  type="text" placeholder="Masukkan Nama Menu" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Harga
                </label>
                <input  type="text" placeholder="Masukkan Harga" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
            {/* BUTTON */}
            <div className="flex gap-3">
                <button type="submit" className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition font-medium" >
                    {editId ? "Update" : "Simpan"}
                </button>

                {editId && (
                <button   type="button" onClick={() => {setEditId(null); setName("");}} className="flex-1 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition font-medium">
                    Batal
                </button>
                )}
            </div>
        </form>
        <div className="bg-white rounded-xl shadow-md mt-6 overflow-hidden">
            <table className="w-full">
            <thead className="bg-blue-500">
                <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nama</th>
                    <th className="p-3 text-left">Harga</th>
                    <th className="p-3 text-left">Aksi</th>
                </tr>
            </thead>
            <tbody>
            {menu.length === 0 ? (
                <tr>
                    <td colSpan="3" className="border border-gray-400 p-3 text-center" >
                        Tidak ada data
                    </td>
                </tr>
            ) : (
              menu.map((s) => (
                <tr key={s.id}>
                    <td className="border border-gray-400 p-2 text-center">{s.id}</td>
                    <td className="border border-gray-400 p-2">{s.name}</td>
                    <td className="border border-gray-400 p-2">{s.name}</td>
                    <td className="border border-gray-400 p-2">
                        <button onClick={() => {setEditId(s.id); setName(s.name);}} className="px-3 py-1 mr-2 bg-yellow-400 rounded-md hover:bg-yellow-500 transition">
                            Edit
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                            Hapus
                        </button>
                    </td>
                </tr>
              ))
            )}
            </tbody>
            </table>
        </div>
    </div>
  );
}
