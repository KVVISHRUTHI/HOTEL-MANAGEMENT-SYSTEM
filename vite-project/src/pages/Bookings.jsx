import { useEffect, useState } from "react";
import api from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    bookingStatus: "Confirmed",
    customerId: "",
    roomId: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const addBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings", {
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        totalAmount: Number(formData.totalAmount),
        bookingStatus: formData.bookingStatus,
        customer: { customerId: Number(formData.customerId) },
        room: { roomId: Number(formData.roomId) },
      });
      setFormData({
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
        bookingStatus: "Confirmed",
        customerId: "",
        roomId: "",
      });
      fetchBookings();
    } catch (error) {
      console.error("Failed to add booking", error);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-emerald-100 text-emerald-700";
      case "Pending":   return "bg-amber-100 text-amber-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default:          return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Bookings</h1>
        <p className="mt-2 text-slate-600">Create reservations and review active booking records.</p>
      </div>

      <form onSubmit={addBooking} className="card-shadow p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="checkInDate" className="text-xs font-medium text-slate-500 uppercase tracking-wide">Check-in Date</label>
            <input
              id="checkInDate"
              name="checkInDate"
              type="date"
              autoComplete="off"
              className="field-input cursor-pointer"
              value={formData.checkInDate}
              onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="checkOutDate" className="text-xs font-medium text-slate-500 uppercase tracking-wide">Check-out Date</label>
            <input
              id="checkOutDate"
              name="checkOutDate"
              type="date"
              className="field-input cursor-pointer"
              value={formData.checkOutDate}
              onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
              required
            />
          </div>
          <input
            type="number"
            placeholder="Total Amount"
            className="field-input"
            value={formData.totalAmount}
            onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
            required
          />
          <select
            className="field-input"
            value={formData.bookingStatus}
            onChange={(e) => setFormData({ ...formData, bookingStatus: e.target.value })}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="number"
            placeholder="Customer ID"
            className="field-input"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Room ID"
            className="field-input"
            value={formData.roomId}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="action-btn mt-4">
          Add Booking
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Room</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-slate-500">
                  No bookings recorded yet.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.bookingId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{booking.bookingId}</td>
                  <td className="p-4">{booking.checkInDate}</td>
                  <td className="p-4">{booking.checkOutDate}</td>
                  <td className="p-4">Rs {booking.totalAmount}</td>
                  <td className="p-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus ?? "—"}
                    </span>
                  </td>
                  <td className="p-4">{booking.customer?.customerName ?? `#${booking.customer?.customerId ?? "—"}`}</td>
                  <td className="p-4">{booking.room?.roomType ?? `#${booking.room?.roomId ?? "—"}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
