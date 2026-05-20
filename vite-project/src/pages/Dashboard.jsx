import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    hotels: 0,
    rooms: 0,
    bookings: 0,
    customers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [hotelRes, roomRes, bookingRes, customerRes] = await Promise.all([
          api.get("/hotels"),
          api.get("/rooms"),
          api.get("/bookings"),
          api.get("/customers"),
        ]);

        const bookings = bookingRes.data || [];
        const revenue = bookings.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

        setStats({
          hotels: hotelRes.data.length,
          rooms: roomRes.data.length,
          bookings: bookings.length,
          customers: customerRes.data.length,
          revenue,
        });
        setError(null);
      } catch (err) {
        console.error("Unable to load dashboard stats", err);
        setError("Could not connect to backend. Make sure the Spring Boot server is running on port 8080.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const items = [
    { label: "Total Hotels",    value: stats.hotels,           accent: "from-sky-500 to-cyan-400" },
    { label: "Total Rooms",     value: stats.rooms,            accent: "from-emerald-500 to-teal-400" },
    { label: "Total Customers", value: stats.customers,        accent: "from-violet-500 to-fuchsia-400" },
    { label: "Total Bookings",  value: stats.bookings,         accent: "from-orange-500 to-amber-400" },
    { label: "Total Revenue",   value: `Rs ${stats.revenue.toLocaleString()}`, accent: "from-rose-500 to-pink-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Quick overview of your hotel operations.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-[26px] bg-slate-200" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="rounded-[26px] bg-white p-5 shadow-lg shadow-slate-400/10">
              <div className={`mb-3 h-2 w-20 rounded-full bg-gradient-to-r ${item.accent}`} />
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
