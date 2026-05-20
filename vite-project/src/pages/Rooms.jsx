import { useEffect, useState } from "react";
import api from "../api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomType: "",
    price: "",
    status: "Available",
    hotelId: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    }
  };

  const addRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post("/rooms", {
        roomType: formData.roomType,
        price: Number(formData.price),
        status: formData.status,
        hotel: { hotelId: Number(formData.hotelId) },
      });
      setFormData({ roomType: "", price: "", status: "Available", hotelId: "" });
      fetchRooms();
    } catch (error) {
      console.error("Failed to add room", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Rooms</h1>
        <p className="mt-2 text-slate-600">Track room inventory and pricing for each hotel.</p>
      </div>

      <form onSubmit={addRoom} className="card-shadow p-6" autoComplete="off">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            autoComplete="off"
            placeholder="Room Type (e.g. Deluxe)"
            className="field-input"
            value={formData.roomType}
            onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price per night"
            className="field-input"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <select
            className="field-input"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input
            type="number"
            placeholder="Hotel ID"
            className="field-input"
            value={formData.hotelId}
            onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="action-btn mt-4">
          Add Room
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Hotel</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-500">
                  No rooms added yet.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.roomId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{room.roomId}</td>
                  <td className="p-4">{room.roomType}</td>
                  <td className="p-4">Rs {room.price}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        room.status === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : room.status === "Booked"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="p-4">{room.hotel?.hotelName ?? `#${room.hotel?.hotelId ?? "—"}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rooms;
