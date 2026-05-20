import { useEffect, useState } from "react";
import api from "../api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({ amount: "", paymentStatus: "Paid", bookingId: "" });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get("/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();
    try {
      await api.post("/payments", {
        amount: Number(formData.amount),
        paymentStatus: formData.paymentStatus,
        booking: { bookingId: Number(formData.bookingId) },
      });
      setFormData({ amount: "", paymentStatus: "Paid", bookingId: "" });
      fetchPayments();
    } catch (error) {
      console.error("Failed to add payment", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Payments</h1>
        <p className="mt-2 text-slate-600">Record payments and monitor your booking revenue.</p>
      </div>

      <form onSubmit={addPayment} className="card-shadow p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="number"
            placeholder="Amount"
            className="field-input"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <select
            className="field-input"
            value={formData.paymentStatus}
            onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <input
            type="number"
            placeholder="Booking ID"
            className="field-input"
            value={formData.bookingId}
            onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
          />
        </div>
        <button type="submit" className="action-btn mt-4">
          Add Payment
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-slate-500">
                  No payments recorded yet.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.paymentId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{payment.paymentId}</td>
                  <td className="p-4">Rs {payment.amount}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        payment.paymentStatus === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : payment.paymentStatus === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.paymentStatus ?? "—"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
