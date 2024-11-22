export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  images: string[];
  rating: number;
  type: string;
  beds: number;
  baths: number;
  coordinates: [number, number];
  sqft: number;
  available: string;
  listedDate: string;
  description: string;
  furnished: string;
  amenities: string[];
}

export const mockProperties: Property[] = [
  {
    id: 0,
    title: "Modern Downtown Apartment",
    price: "$2,500/month",
    location: "123 Downtown St, New York",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560449752-3fd74f5f4f68?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    type: "Apartment",
    beds: 2,
    baths: 2,
    coordinates: [40.7128, -74.0060],
    sqft: 850,
    available: "Available Now",
    listedDate: "Listed 2 days ago",
    description: "Stunning modern apartment in the heart of downtown. Features high-end finishes, floor-to-ceiling windows, and spectacular city views. Recently renovated with state-of-the-art appliances.",
    furnished: "Fully Furnished",
    amenities: [
      "In-unit Laundry",
      "Central AC",
      "Dishwasher",
      "Hardwood Floors",
      "Gym Access",
      "Rooftop Deck",
      "24/7 Doorman",
      "Pet Friendly"
    ]
  },
  {
    id: 1,
    title: "Luxury Waterfront Condo",
    price: "$3,200/month",
    location: "456 Harbor View, Brooklyn",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560449752-3fd74f5f4f68?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    type: "Condo",
    beds: 2,
    baths: 2,
    coordinates: [40.7228, -74.0060],
    sqft: 1100,
    available: "Available Mar 1",
    listedDate: "Listed 1 week ago",
    description: "Luxurious waterfront condo with breathtaking harbor views. This premium unit features modern amenities, an open floor plan, and a private balcony perfect for entertaining.",
    furnished: "Unfurnished",
    amenities: [
      "Private Balcony",
      "Pool",
      "Parking",
      "Storage Unit",
      "Concierge",
      "Business Center",
      "Wine Cellar",
      "Electric Car Charging"
    ]
  },
  {
    id: 2,
    title: "Cozy Studio in Heart of City",
    price: "$1,800/month",
    location: "789 Central Ave, Manhattan",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    type: "Studio",
    beds: 1,
    baths: 1,
    coordinates: [40.7158, -74.0090],
    sqft: 550,
    available: "Available Now",
    listedDate: "Listed 3 days ago",
    description: "Efficiently designed studio apartment in a prime location. Perfect for young professionals or students. Features built-in storage solutions and modern appliances.",
    furnished: "Semi-Furnished",
    amenities: [
      "Built-in Storage",
      "Bike Storage",
      "High-Speed Internet",
      "Security System",
      "Package Room",
      "Laundry Room",
      "Roof Access",
      "Study Room"
    ]
  }
];