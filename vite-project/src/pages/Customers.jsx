import { useEffect, useState } from "react";
import api from "../api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ customerName: "", email: "", phone: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", formData);
      setFormData({ customerName: "", email: "", phone: "" });
      fetchCustomers();
    } catch (error) {
      console.error("Failed to add customer", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Customers</h1>
        <p className="mt-2 text-slate-600">Manage customer contacts and details.</p>
      </div>

      <form onSubmit={addCustomer} className="card-shadow p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Customer Name"
            className="field-input"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="field-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="field-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <button type="submit" className="action-btn mt-4">
          Add Customer
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-400/10">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-500">
                  No customers added yet.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.customerId} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">{customer.customerId}</td>
                  <td className="p-4">{customer.customerName}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">{customer.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
