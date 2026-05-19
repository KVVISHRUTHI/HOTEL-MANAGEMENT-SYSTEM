import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Cancellations from "./pages/Cancellations";

function App() {
  return (
    <BrowserRouter>

      <div className="flex">

        <div className="w-64 min-h-screen bg-black text-white p-5">
          <h1 className="text-2xl font-bold mb-8">
            Hotel System
          </h1>

          <div className="flex flex-col gap-4">
            <Link to="/">Dashboard</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/bookings">Bookings</Link>
            <Link to="/payments">Payments</Link>
            <Link to="/cancellations">Cancellations</Link>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/cancellations" element={<Cancellations />} />
          </Routes>
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;