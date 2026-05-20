import { useEffect, useState } from "react";
import api from "../api";

function Cancellations() {
  const [cancellations, setCancellations] = useState([]);
  const [formData, setFormData] = useState({ cancellationDate: "", refundAmount: "", bookingId: "" });

  useEffect(() => {
    fetchCancellations();
  }, []);

  const fetchCancellations = async () => {
    try {
      const response = await api.get("/cancellations");
      setCancellations(response.data);
    } catch (error) {
      console.error("Failed to fetch cancellations", error);
    }
  };

  const addCancellation = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cancellations", {
        cancellationDate: formData.cancellationDate,
        refundAmount: Number(formData.refundAmount),
        booking: { bookingId: Number(formData.bookingId) },
      });
      setFormData({ cancellationDate: "", refundAmount: "", bookingId: "" });
      fetchCancellations();
    } catch (error) {
      console.error("Failed to add cancellation", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Cancellations</h1>
        <p className="mt-2 text-slate-600">Log cancellations and refunds for any booking.</p>
      </div>

      <form onSubmit={addCancellation} className="card-shadow p-6" autoComplete="off">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="cancellationDate" className="text-xs font-medium text-slate-500 uppercase tracking-wide">Cancellation Date</label>
            <input
              id="cancellationDate"
              name="cancellationDate"
              type="date"
              autoComplete="off"
              className="field-input cursor-pointer"
              value={formData.cancellationDate}
              onChange={(e) => setFormData({ ...formData, cancellationDate: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="refundAmount" className="text-xs font-medium text-slate-500 uppercase tracking-wide">Refund Amount</label>
            <input
              id="refundAmount"
              name="refundAmount"
              type="number"
              placeholder="Refund Amount"
              className="field-input"
              value={formData.refundAmount}
              onChange={(e) => setFormData({ ...formData, refundAmount: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="bookingId" className="text-xs font-medium text-slate-500 uppercase tracking-wide">Booking ID</label>
            <input
              id="bookingId"
              name="bookingId"
              type="number"
              placeholder="Booking ID"
              className="field-input"
              value={formData.bookingId}
              onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="action-btn mt-4">
          Add Cancellation
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Refund</th>
            </tr>
          </thead>
          <tbody>
            {cancellations.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-slate-500">
                  No cancellations recorded yet.
                </td>
              </tr>
            ) : (
              cancellations.map((cancel) => (
                <tr key={cancel.cancellationId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{cancel.cancellationId}</td>
                  <td className="p-4">{cancel.cancellationDate}</td>
                  <td className="p-4">Rs {cancel.refundAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cancellations;
