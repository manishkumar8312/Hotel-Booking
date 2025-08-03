export async function fetchRooms() {
  const res = await fetch('/api/rooms');
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

export async function fetchRoomById(id) {
  const res = await fetch(`/api/rooms/${id}`);
  if (!res.ok) throw new Error('Failed to fetch room details');
  return res.json();
}

export async function fetchBookings() {
  const res = await fetch('/api/bookings');
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}
