import { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {

  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    roomType: "",
    price: "",
    hotelId: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const response = await axios.get(
      "http://localhost:8080/rooms"
    );

    setRooms(response.data);
  };

  const addRoom = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/rooms",
      {
        roomType: formData.roomType,
        price: formData.price,

        hotel: {
          hotelId: formData.hotelId,
        },
      }
    );

    fetchRooms();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Rooms
      </h1>

      <form
        onSubmit={addRoom}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="grid grid-cols-2 gap-3">

          <input
            type="text"
            placeholder="Room Type"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                roomType: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Hotel ID"
            className="border p-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelId: e.target.value,
              })
            }
          />

        </div>

        <button className="bg-blue-500 text-white px-5 py-2 mt-4">
          Add Room
        </button>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Room Type</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>

        <tbody>

          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td className="p-3">{room.roomId}</td>
              <td className="p-3">{room.roomType}</td>
              <td className="p-3">₹{room.price}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Rooms;