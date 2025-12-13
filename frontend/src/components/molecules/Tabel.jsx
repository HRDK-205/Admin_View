import { useEffect, useState } from "react";

export default function Table() {
    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState("");
  
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/students");
      const data = await res.json();
      setStudents(data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Hapus data ini?")) return;
    
        await fetch(`http://localhost:5000/students/${id}`, {
          method: "DELETE",
        });
    
        fetchData();
      };

    return (    
      <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
  
          <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-400 p-3 text-center"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id}>
                <td className="border border-gray-400 p-2 text-center">
                  {s.id}
                </td>
                <td className="border border-gray-400 p-2">{s.name}</td>
                <td className="border border-gray-400 p-2">
                  <button
                    onClick={() => {
                      setEditId(s.id);
                      setName(s.name);
                    }}
                    className="px-3 py-1 mr-2 bg-yellow-400 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
    );
  }
