import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileInput, ListOrdered} from "lucide-react"; // Opsional: Ikon agar lebih menarik
// import { Orders } from "../pages/Orders";

export default function Sidebar() {
  // Helper class untuk styling link aktif
  const activeLink = "block p-2 rounded bg-blue-600 text-white";
  const normalLink = "block p-2 rounded hover:bg-slate-700 text-slate-300 transition-colors";

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-5 text-xl font-bold border-b border-slate-700">
        AdminPanel
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className="flex items-center gap-3">
            <FileInput size={18} />
            <span>Menu</span>
          </div>
        </NavLink> 
        <NavLink to="/My-Orders" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className="flex items-center gap-3">
            <ListOrdered size={18} />
            <span>My-Orders</span>
          </div>
        </NavLink>
        
      </nav>
    </aside>
  );
}