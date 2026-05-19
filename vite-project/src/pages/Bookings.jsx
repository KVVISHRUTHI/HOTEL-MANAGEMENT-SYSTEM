import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    customerId: "",
    roomId: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get(
      "http://localhost:8080/bookings"
    );

    setBookings(response.data);
  };

  const addBooking = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/bookings",
      {
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        totalAmount: formData.totalAmount,

        customer: {
          customerId: formData.customerId,
        },

        room: {
          roomId: formData.roomId,
        },
      }
    );

    fetchBookings();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Bookings
      </h1>

      <form
        onSubmit={addBooking}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="grid grid-cols-2 gap-3">

          <input
            type="date"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                checkInDate: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                checkOutDate: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                totalAmount: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Customer ID"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                customerId: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Room ID"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                roomId: e.target.value,
              })
            }
          />

        </div>

        <button className="bg-blue-500 text-white px-5 py-2 mt-4">
          Add Booking
        </button>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Check In</th>
            <th className="p-3">Check Out</th>
            <th className="p-3">Amount</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td className="p-3">
                {booking.bookingId}
              </td>

              <td className="p-3">
                {booking.checkInDate}
              </td>

              <td className="p-3">
                {booking.checkOutDate}
              </td>

              <td className="p-3">
                ₹{booking.totalAmount}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Bookings;