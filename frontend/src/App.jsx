import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/contexcs/AuthContext";
import Login from "./components/pages/Login";
// import Dashboard from "./components/pages/Dashboard";
import MultiChart from "./components/pages/Managemen";
import Menu from "./components/pages/FormMenu";
import Orders from "./components/pages/Orders";
import MyOrders from './components/pages/My-Orders';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Admin" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MultiChart />
              </ProtectedRoute>
            } 
          />
          {/* <Route path="/" element={<Navigate/>} /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/" element={<Orders />} />
          <Route path="/My-Orders" element={<MyOrders />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;