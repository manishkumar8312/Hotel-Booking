import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

// Fix default icon issues with Leaflet in a Vite/React environment
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HotelMap = () => {
  const navigate = useNavigate();

  // Get unique hotels from dummy data
  const hotelsMap = new Map();
  roomsDummyData.forEach(room => {
    if (room.hotel && room.hotel._id) {
      hotelsMap.set(room.hotel._id, room.hotel);
    }
  });
  const hotels = Array.from(hotelsMap.values());

  // Fallback center coordinate (use first hotel or default to New York)
  const defaultCenter = hotels.length > 0 && hotels[0].coordinates 
      ? [hotels[0].coordinates.lat, hotels[0].coordinates.lng]
      : [40.7128, -74.0060];

  if (!hotels.length) {
    return (
      <div className="pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center py-20">
          <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-4">Hotels Map View</h1>
          <p className="text-gray-600">No hotels available to display on the map.</p>
        </div>
      </div>
    );
  }

  const handleViewRooms = (hotelId) => {
    // Find a room from this hotel to navigate to rooms page
    const room = roomsDummyData.find(r => r.hotel._id === hotelId);
    if (room) {
      navigate(`/rooms/${room._id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 pb-10">
      <div className="mb-8">
        <h1 className="text-4xl md:text-[40px] font-playfair font-bold text-gray-800">Hotels Map View</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          Discover hotel locations on an interactive map. Click on markers to view hotel details and available rooms.
        </p>
      </div>
      
      <div className="w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer 
          center={defaultCenter} 
          zoom={13} 
          scrollWheelZoom={true} 
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotels.map(hotel => (
            hotel.coordinates && (
              <Marker 
                key={hotel._id} 
                position={[hotel.coordinates.lat, hotel.coordinates.lng]}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-playfair text-lg font-bold text-gray-800 mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 flex items-start gap-1">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {hotel.address}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      📍 {hotel.city}
                    </p>
                    <button 
                      onClick={() => handleViewRooms(hotel._id)}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-200"
                    >
                      View Rooms
                    </button>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} • Click on map markers for more details
        </p>
      </div>
    </div>
  );
};

export default HotelMap;
