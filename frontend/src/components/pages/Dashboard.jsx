import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";
import StatCard from "../molecules/Startcard";
import Table from "../molecules/Tabel";
import Menu from "../molecules/inputMenu";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full">
        <Navbar />
        <Menu/>
        <main className="p-6">
          {/* STAT */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Users" value="120" />
            <StatCard title="Active Users" value="87" />
            <StatCard title="Reports" value="34" />
          </div> */}

          {/* TABLE */}
          {/* <Table /> */}
        </main>
      </div>
    </div>
  );
}
