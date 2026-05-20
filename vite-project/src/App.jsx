import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Cancellations from "./pages/Cancellations";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Hotels", path: "/hotels" },
  { label: "Rooms", path: "/rooms" },
  { label: "Customers", path: "/customers" },
  { label: "Bookings", path: "/bookings" },
  { label: "Payments", path: "/payments" },
  { label: "Cancellations", path: "/cancellations" },
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 md:px-8">
          <aside className="hidden w-72 shrink-0 rounded-[32px] bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-slate-900/20 md:block">
            <div className="mb-10 text-center">
              <p className="text-lg font-semibold uppercase tracking-[0.25em] text-sky-400 whitespace-nowrap">Hotel Organizer</p>
              <p className="mt-3 text-lg text-slate-300">Manage rooms, bookings, customers and payments in one place.</p>
            </div>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-lg transition ${
                      isActive ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <header className="mb-6 flex flex-col gap-3 rounded-[32px] bg-white/90 p-6 shadow-xl shadow-slate-400/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">DISTRIBUTED HOTEL RESERVATION SYSTEM</h1>
              </div>
            </header>

            <div className="card-shadow p-6">
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
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
