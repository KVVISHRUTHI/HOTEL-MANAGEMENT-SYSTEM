import { useEffect, useState } from "react";
import api from "../api";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({ hotelName: "", city: "", address: "" });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await api.get("/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  };

  const addHotel = async (e) => {
    e.preventDefault();
    try {
      await api.post("/hotels", {
        hotelName: formData.hotelName,
        city: formData.city,
        address: formData.address,
      });
      setFormData({ hotelName: "", city: "", address: "" });
      fetchHotels();
    } catch (error) {
      console.error("Failed to add hotel", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Hotels</h1>
        <p className="mt-2 text-slate-600">Create and review hotels in your system.</p>
      </div>

      <form onSubmit={addHotel} className="card-shadow p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Hotel Name"
            className="field-input"
            value={formData.hotelName}
            onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="field-input"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="field-input"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <button type="submit" className="action-btn">
            Add Hotel
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Hotel Name</th>
              <th className="p-4">City</th>
              <th className="p-4">Address</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-500">
                  No hotels available yet.
                </td>
              </tr>
            ) : (
              hotels.map((hotel) => (
                <tr key={hotel.hotelId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{hotel.hotelId}</td>
                  <td className="p-4">{hotel.hotelName}</td>
                  <td className="p-4">{hotel.city}</td>
                  <td className="p-4">{hotel.address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Hotels;
