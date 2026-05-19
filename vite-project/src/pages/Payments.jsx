import { useEffect, useState } from "react";
import axios from "axios";

function Payments() {

  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    amount: "",
    paymentStatus: "",
    bookingId: "",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const response = await axios.get(
      "http://localhost:8080/payments"
    );

    setPayments(response.data);
  };

  const addPayment = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/payments",
      {
        amount: formData.amount,
        paymentStatus: formData.paymentStatus,

        booking: {
          bookingId: formData.bookingId,
        },
      }
    );

    fetchPayments();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Payments
      </h1>

      <form
        onSubmit={addPayment}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="grid grid-cols-2 gap-3">

          <input
            type="number"
            placeholder="Amount"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Payment Status"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentStatus: e.target.value,
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
          Add Payment
        </button>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td className="p-3">
                {payment.paymentId}
              </td>

              <td className="p-3">
                ₹{payment.amount}
              </td>

              <td className="p-3">
                {payment.paymentStatus}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Payments;