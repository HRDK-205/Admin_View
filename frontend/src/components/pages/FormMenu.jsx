import { useEffect, useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";
import MenuForm from "../molecules/inputMenu";
import MenuTable from "../molecules/Table";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
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
    const payload = { name, harga, kategori, stok, deskripsi };
    const url = editId ? `http://localhost:5000/menu/${editId}` : "http://localhost:5000/menu";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setName(""); setHarga(""); setKategori(""); setStok(""); setDeskripsi("");
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus data ini?")) return;
    await fetch(`http://localhost:5000/menu/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleEditTrigger = (item) => {
    setEditId(item.id);
    setName(item.name);
    setHarga(item.harga);
    setKategori(item.kategori);
    setStok(item.stok);
    setDeskripsi(item.deskripsi);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1 h-full overflow-hidden">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Manajemen Menu Restoran
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <MenuForm 
                  name={name} harga={harga} kategori={kategori}
                  stok={stok} deskripsi={deskripsi} 
                  setName={setName} setHarga={setHarga} 
                  setKategori={setKategori} setStok={setStok} 
                  setDeskripsi={setDeskripsi}
                  editId={editId} setEditId={setEditId} 
                  handleSubmit={handleSubmit} 
                />
              </section>

              <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <MenuTable 
                  menu={menu} 
                  onEdit={handleEditTrigger} 
                  onDelete={handleDelete} 
                />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}