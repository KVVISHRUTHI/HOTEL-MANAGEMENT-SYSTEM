import { useEffect, useState } from "react";
import axios from "axios";

function Hotels() {

  const [hotels, setHotels] = useState([]);

  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const response = await axios.get(
      "http://localhost:8080/hotels"
    );

    setHotels(response.data);
  };

  const addHotel = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/hotels",
      {
        hotelName,
        location,
      }
    );

    setHotelName("");
    setLocation("");

    fetchHotels();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Hotels
      </h1>

      <form
        onSubmit={addHotel}
        className="bg-white p-5 rounded shadow mb-5"
      >

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Hotel Name"
            className="border p-2"
            value={hotelName}
            onChange={(e) =>
              setHotelName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-2"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button className="bg-blue-500 text-white px-5">
            Add
          </button>

        </div>

      </form>

      <table className="w-full bg-white">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Hotel Name</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotelId}>
              <td className="p-3">{hotel.hotelId}</td>
              <td className="p-3">{hotel.hotelName}</td>
              <td className="p-3">{hotel.location}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Hotels;