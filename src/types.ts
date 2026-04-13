export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  rating: number;
}

export interface BookingDetails {
  propertyId: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  totalAmount: number;
}
