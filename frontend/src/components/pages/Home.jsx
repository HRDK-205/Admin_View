// import Navbar from "../organisms/navbar";

export default function Home({name, onLogout}) {
    return (
        <>    
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Overview</h2>
            {/* Statistik Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600">Total Users</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">1,245</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600">Revenue</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">$45,760</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600">Active Sessions</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">96</p>
                </div>
            </div>
                {/* Tabel data */}
            <div className="mt-10 bg-white shadow rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-gray-700">Recent Users</h3>
                    <table className="w-full text-left">
                        <thead>
                        <tr className="border-b text-gray-600">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Email</th>
                            <th className="pb-2">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[
                            { name: "John Doe", email: "john@example.com", status: "Active" },
                            { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
                            { name: "Alex Brown", email: "alex@example.com", status: "Banned" },
                        ].map((user, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                            <td className="py-2">{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span
                                className={`px-2 py-1 rounded text-sm ${
                                    user.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : user.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                                >
                                {user.status}
                                </span>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </div>
        </>
    );
  }