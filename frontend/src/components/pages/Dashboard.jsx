import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";
import MultiChart from "./Managemen";

export default function Dashboard() {
  return (
    // 1. Tambahkan h-screen dan overflow-hidden pada pembungkus utama
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar tetap di tempat karena class fixed di komponennya */}
      <Sidebar />

      {/* 2. Container utama diatur agar bisa scroll secara mandiri */}
      <div className="ml-64 flex flex-col flex-1 h-full overflow-hidden">
        
        {/* 3. Navbar tetap di atas */}
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <main className="p-6">
          <MultiChart />
        </main>
      </div>
    </div>
  );
}
