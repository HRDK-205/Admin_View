export default function Sidebar() {
    return (
      <aside className="w-64 bg-slate-900 text-white min-h-screen fixed">
        <div className="p-5 text-xl font-bold border-b border-slate-700">
          AdminPanel
        </div>
  
        <nav className="p-4 space-y-3">
          <a className="block p-2 rounded hover:bg-slate-700">Dashboard</a>
          <a className="block p-2 rounded hover:bg-slate-700">Users</a>
          <a className="block p-2 rounded hover:bg-slate-700">Reports</a>
          <a className="block p-2 rounded hover:bg-slate-700">Settings</a>
        </nav>
      </aside>
    );
  }
  