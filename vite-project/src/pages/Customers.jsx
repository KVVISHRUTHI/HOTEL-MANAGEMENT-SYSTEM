import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get(
      "http://localhost:8080/customers"
    );

    setCustomers(response.data);
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/customers",
      formData
    );

    fetchCustomers();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Customers
      </h1>

      <form
        onSubmit={addCustomer}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="grid grid-cols-2 gap-3">

          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                customerName: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

        </div>

        <button className="bg-blue-500 text-white px-5 py-2 mt-4">
          Add Customer
        </button>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td className="p-3">
                {customer.customerId}
              </td>

              <td className="p-3">
                {customer.customerName}
              </td>

              <td className="p-3">
                {customer.email}
              </td>

              <td className="p-3">
                {customer.phone}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;