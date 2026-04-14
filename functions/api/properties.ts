export async function onRequest(context) {
  const properties = [
    {
      id: "1",
      name: "Namushasha River Lodge",
      location: "Zambezi Region",
      price: 2450,
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      description: "A gateway to the Zambezi, set on the banks of the Kwando River.",
      amenities: ["Pool", "Restaurant", "Game Drives", "Boat Trips"],
      rating: 4.8
    },
    {
      id: "2",
      name: "Etosha King Nehale",
      location: "Etosha National Park",
      price: 3100,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      description: "A cultural experience on the northern plains of Etosha.",
      amenities: ["Private Waterhole", "Cultural Tours", "Pool", "Bar"],
      rating: 4.9
    },
    {
      id: "3",
      name: "The Delight Swakopmund",
      location: "Swakopmund",
      price: 1850,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      description: "A fresh breeze in the desert, colorful and modern.",
      amenities: ["Breakfast Buffet", "Central Location", "Modern Design"],
      rating: 4.7
    },
    {
      id: "4",
      name: "Damara Mopane Lodge",
      location: "Damaraland",
      price: 2100,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description: "Built in a semi-circle with a vegetable garden for each chalet.",
      amenities: ["Gardens", "Pool", "Sunset Deck", "Hiking"],
      rating: 4.6
    }
  ];

  return Response.json(properties);
}
