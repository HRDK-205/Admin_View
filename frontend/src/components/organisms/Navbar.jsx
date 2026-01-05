import { LogOut, Key } from "lucide-react"; // Import ikon

export default function Navbar() {
  const handleLogout = () => {
    // Tambahkan logika hapus token/session di sini jika ada
    window.location.href = "/Admin"; // Navigasi ke halaman login
  };

  return (
    <header className="h-16 bg-slate-900 shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold"></h1>

      <div className="flex items-center gap-4">
        {/* Nama dan Foto Profil */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full w-8 h-8"
          />
        </div>

        {/* Garis Pemisah (Opsional) */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Logout"
        >
          <Key size={18} /> {/* Ikon Kunci */}
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}