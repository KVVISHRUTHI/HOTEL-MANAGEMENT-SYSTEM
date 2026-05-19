function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded shadow">
          <h2>Total Hotels</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2>Total Rooms</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2>Total Bookings</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2>Total Revenue</h2>
          <p className="text-2xl font-bold">₹0</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;