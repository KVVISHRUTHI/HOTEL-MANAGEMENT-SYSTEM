import { useEffect, useState } from "react";
import axios from "axios";

function Cancellations() {

  const [cancellations, setCancellations] = useState([]);

  const [formData, setFormData] = useState({
    cancellationDate: "",
    refundAmount: "",
    bookingId: "",
  });

  useEffect(() => {
    fetchCancellations();
  }, []);

  const fetchCancellations = async () => {
    const response = await axios.get(
      "http://localhost:8080/cancellations"
    );

    setCancellations(response.data);
  };

  const addCancellation = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/cancellations",
      {
        cancellationDate: formData.cancellationDate,
        refundAmount: formData.refundAmount,

        booking: {
          bookingId: formData.bookingId,
        },
      }
    );

    fetchCancellations();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Cancellations
      </h1>

      <form
        onSubmit={addCancellation}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="grid grid-cols-2 gap-3">

          <input
            type="date"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                cancellationDate: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Refund Amount"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                refundAmount: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Booking ID"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                bookingId: e.target.value,
              })
            }
          />

        </div>

        <button className="bg-blue-500 text-white px-5 py-2 mt-4">
          Add Cancellation
        </button>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Refund</th>
          </tr>
        </thead>

        <tbody>

          {cancellations.map((cancel) => (
            <tr key={cancel.cancellationId}>
              <td className="p-3">
                {cancel.cancellationId}
              </td>

              <td className="p-3">
                {cancel.cancellationDate}
              </td>

              <td className="p-3">
                ₹{cancel.refundAmount}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Cancellations;