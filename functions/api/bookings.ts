export async function onRequestPost({ request }) {
  const body = await request.json();
  const { propertyId, checkIn, checkOut, guests, totalAmount } = body;
  console.log("New Booking Received:", { propertyId, checkIn, checkOut, guests, totalAmount });
  
  return Response.json({ 
    message: "Booking confirmed!", 
    bookingId: Math.random().toString(36).substring(7),
    details: { propertyId, checkIn, checkOut, guests, totalAmount }
  }, { status: 201 });
}
