import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { MessageSquare, Share2, Star, SlidersHorizontal, Menu, ChevronLeft, ChevronRight, Search, Layers } from 'lucide-react';
import { SignIn, useUser, UserButton } from '@clerk/clerk-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProperties } from '../data/mock-properties';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'custom-marker-icon'
});

// Active marker icon
const activeIcon = new L.Icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'custom-marker-icon active'
});

function MapControls() {
  const map = useMap();
  const [mapType, setMapType] = useState('default');

  const toggleMapType = () => {
    if (mapType === 'default') {
      setMapType('satellite');
      // Switch to satellite view (example URL)
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(map);
    } else {
      setMapType('default');
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        className: 'map-tiles'
      }).addTo(map);
    }
  };

  return (
    <div className="absolute bottom-8 right-8 z-[400] flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-background shadow-lg hover:bg-accent"
        onClick={() => map.locate({ setView: true, maxZoom: 16 })}
      >
        <Search className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-background shadow-lg hover:bg-accent"
        onClick={toggleMapType}
      >
        <Layers className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function SearchResults() {
  const { isSignedIn, user } = useUser();
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showListings, setShowListings] = useState(true);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [showListings, map]);

  const handlePropertyClick = (propertyId: number) => {
    setActiveProperty(propertyId);
    const property = mockProperties.find(p => p.id === propertyId);
    if (property && map) {
      map.setView(property.coordinates, 16, { animate: true });
    }
  };

  const handleMarkerClick = (propertyId: number) => {
    setActiveProperty(propertyId);
    if (!showListings) {
      setShowListings(true);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full p-6">
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowListings(!showListings)}
              >
                <Menu className="h-5 w-5" />
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
      <div className="flex flex-1 pt-16 relative">
        {/* Left side - Property listings */}
        <AnimatePresence>
          {showListings && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full lg:w-2/5 relative bg-background h-[calc(100vh-4rem)] overflow-hidden border-r flex-shrink-0"
            >
              <div className="sticky top-0 bg-background z-10 p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">3,348 listings found</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border hover:bg-accent transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm">Filters</span>
                  </button>
                </div>
              </div>
              
              <div className="divide-y overflow-auto h-[calc(100%-4rem)]">
                {mockProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    className={`p-4 hover:bg-accent/50 cursor-pointer transition-all ${
                      activeProperty === property.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => handlePropertyClick(property.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-sm sm:text-base truncate">{property.title}</h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{property.location}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">{property.sqft} sqft</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="font-medium text-sm sm:text-base">{property.price}</p>
                          <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">{property.available}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setShowListings(!showListings)}
          className={`absolute top-32 z-50 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.16)] rounded-full h-12 items-center justify-center flex ${
            showListings ? 'right-[-24px]' : 'left-[-24px]'
          }`}
          style={{ width: '48px' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showListings ? (
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </motion.button>

        {/* Right side - Map */}
        <div className="flex-1 h-[calc(100vh-4rem)] relative">
          <MapContainer
            center={[40.7128, -74.0060]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            whenCreated={setMap}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              className="map-tiles"
            />
            <ZoomControl position="bottomright" />
            <MapControls />
            {mockProperties.map((property) => (
              <Marker
                key={property.id}
                position={property.coordinates}
                icon={activeProperty === property.id ? activeIcon : customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(property.id),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                    <p className="text-sm font-medium mb-1">{property.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {property.beds} beds • {property.baths} baths • {property.sqft} sqft
                    </p>
                    <Button
                      className="w-full mt-2"
                      size="sm"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}