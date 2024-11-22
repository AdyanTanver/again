import { useState } from 'react';
import { DollarSign, MapPin, Home, X, Check } from 'lucide-react';
import { MultiStepLoader } from './ui/multi-step-loader';
import { useNavigate } from 'react-router-dom';
import { useUser, SignIn } from '@clerk/clerk-react';

interface SearchCriteria {
  price: boolean;
  location: boolean;
  size: boolean;
}

interface SearchChunk {
  text: string;
  type: 'price' | 'location' | 'size';
  color: string;
}

const loadingStates = [
  { text: "Scanning listing sites..." },
  { text: "Finding the best matches..." },
  { text: "Analyzing prices..." },
  { text: "Negotiating with realtors..." },
  { text: "Preparing your results..." }
];

export function SearchValidation() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [availableListings, setAvailableListings] = useState(7583);
  const [searchChunks, setSearchChunks] = useState<SearchChunk[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    price: false,
    location: false,
    size: false,
  });
  const { isSignedIn } = useUser();

  const analyzeInput = (input: string) => {
    const priceRegex = /\$?\d+(?:,\d{3})*(?:\.\d{2})?|\d+\s*(?:dollars?|USD)/i;
    const locationRegex = /(?:in|at|near|around)\s+([a-zA-Z\s,]+)/i;
    const sizeRegex = /(?:\d+\s*bed(?:room)?s?|studio|apartment|house|condo)/i;

    const newChunks: SearchChunk[] = [];
    const newCriteria = { ...searchCriteria };

    const priceMatch = input.match(priceRegex);
    if (priceMatch) {
      newChunks.push({
        text: priceMatch[0],
        type: 'price',
        color: 'bg-blue-100 text-blue-800'
      });
      newCriteria.price = true;
    }

    const locationMatch = input.match(locationRegex);
    if (locationMatch) {
      newChunks.push({
        text: locationMatch[0],
        type: 'location',
        color: 'bg-green-100 text-green-800'
      });
      newCriteria.location = true;
    }

    const sizeMatch = input.match(sizeRegex);
    if (sizeMatch) {
      newChunks.push({
        text: sizeMatch[0],
        type: 'size',
        color: 'bg-purple-100 text-purple-800'
      });
      newCriteria.size = true;
    }

    setSearchChunks(newChunks);
    setSearchCriteria(newCriteria);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    analyzeInput(value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasAllCriteria = Object.values(searchCriteria).every(Boolean);
    
    if (hasAllCriteria) {
      if (!isSignedIn) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setShowAuth(true);
        }, 2000);
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = '/search';
        }, 5000);
      }
    }
  };

  const removeChunk = (index: number) => {
    const chunk = searchChunks[index];
    setSearchChunks(searchChunks.filter((_, i) => i !== index));
    setSearchCriteria(prev => ({
      ...prev,
      [chunk.type]: false
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <p className="text-center text-sm sm:text-base text-muted-foreground">
        You pre-qualify for <span className="text-green-500 font-semibold">{availableListings}</span> places near you
      </p>

      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Find me a two bedroom apartment in downtown..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-zinc-900 text-foreground rounded-2xl border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base pr-[90px] sm:pr-[120px]"
          />
          <button
            type="submit"
            disabled={!Object.values(searchCriteria).every(Boolean)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-1.5 sm:py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search →
          </button>
        </div>
      </form>

      {searchChunks.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
          {searchChunks.map((chunk, index) => (
            <div
              key={index}
              className={`${chunk.color} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm`}
            >
              {chunk.text}
              <button
                onClick={() => removeChunk(index)}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5 sm:p-1"
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <DollarSign className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${searchCriteria.price ? 'text-green-500' : ''}`} />
          Price range
          {searchCriteria.price && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <MapPin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${searchCriteria.location ? 'text-green-500' : ''}`} />
          Location/Area
          {searchCriteria.location && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Home className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${searchCriteria.size ? 'text-green-500' : ''}`} />
          Size/Bedrooms
          {searchCriteria.size && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />}
        </div>
      </div>

      {isLoading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={1000}
          loop={false}
        />
      )}

      {showAuth && !isSignedIn && !isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="max-w-md w-full p-8 bg-background border rounded-lg shadow-lg">
            <SignIn redirectUrl="/search" />
          </div>
        </div>
      )}
    </div>
  );
}