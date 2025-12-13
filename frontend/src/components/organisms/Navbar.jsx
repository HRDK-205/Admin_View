export default function Navbar() {
    return (
      <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
  
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full"
          />
        </div>
      </header>
    );
  }
  