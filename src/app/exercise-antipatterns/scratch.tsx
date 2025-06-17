import { useState } from "react";

function HotelSelection() {
  const [hotels] = useState([
    {
      id: "h1",
      name: "Grand Hotel",
      price: 200,
    },
    {
      id: "h2",
      name: "Luxury Hotel",
      price: 300,
    },
  ]);
  type Hotel = {
    id: string;
    name: string;
    price: number;
  };
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null); // vinaxav mtlian objects

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotelId(hotelId); // vimeoreb monacems fomelic momdis hotelebis arraidan
  };

  const selectedHotel = hotels.find((h) => h.id === selectedHotelId);

  return (
    <div>
      {selectedHotel && (
        <div>
          {selectedHotel.name} - ${selectedHotel.price}
        </div>
      )}
    </div>
  );
}
