import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { GetNowButton } from './ui/get-now-button';
import { mockProperties } from '../data/mock-properties';
import { UserButton } from '@clerk/clerk-react';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties[Number(id)];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button variant="link" onClick={() => navigate('/search')}>
            Back to search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/search')}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <a href="/" className="flex items-center h-12 sm:h-16">
                <img
                  src="https://logoblack.s3.us-east-1.amazonaws.com/logo-fac-B.png"
                  alt="FindACrib Logo"
                  className="h-full w-auto object-contain dark:hidden"
                />
                <img
                  src="https://logowhite.s3.us-east-1.amazonaws.com/wide+logo+%40+cove+(2).png"
                  alt="FindACrib Logo"
                  className="h-full w-auto object-contain hidden dark:block"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Property Image */}
          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Get Now Button */}
          <GetNowButton />

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">{property.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
              </div>
              <p className="text-2xl font-bold mt-4">{property.price}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm text-muted-foreground">Bedrooms</h3>
                <p className="text-lg font-medium">{property.beds}</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Bathrooms</h3>
                <p className="text-lg font-medium">{property.baths}</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Square Feet</h3>
                <p className="text-lg font-medium">{property.sqft}</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Furnished</h3>
                <p className="text-lg font-medium">{property.furnished}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="p-3 bg-accent rounded-lg text-sm"
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <MapContainer
                  center={property.coordinates}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                  />
                  <Marker position={property.coordinates} />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}