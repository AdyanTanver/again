import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Cover } from './components/ui/cover';
import { ThemeToggle } from './components/theme-toggle';
import { SearchValidation } from './components/search-validation';
import { SearchResults } from './components/search-results';
import { PropertyDetails } from './components/property-details';
import { UserButton, useUser, SignInButton, SignIn, SignUp } from '@clerk/clerk-react';
import { ViewMapButton } from './components/ui/view-map-button';
import { Button } from './components/ui/button';

function HomePage() {
  const { isSignedIn, isLoaded } = useUser();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/search" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-4">
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <>
                      <ViewMapButton />
                      <UserButton afterSignOutUrl="/" />
                    </>
                  ) : (
                    <SignInButton mode="modal">
                      <ViewMapButton />
                    </SignInButton>
                  )}
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl mx-auto -mt-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 sm:mb-8 text-foreground dark:text-white">
            <span className="block mb-1">
              Find amazing rentals{' '}
              <span className="text-muted-foreground">at</span>
            </span>
            <Cover>warp speed</Cover>
          </h1>
          <SearchValidation />
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/sign-in/*" 
        element={
          <SignIn 
            routing="path" 
            path="/sign-in" 
            redirectUrl="/search"
            afterSignInUrl="/search"
          />
        } 
      />
      <Route 
        path="/sign-up/*" 
        element={
          <SignUp 
            routing="path" 
            path="/sign-up" 
            redirectUrl="/search"
            afterSignUpUrl="/search"
          />
        } 
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/property/:id"
        element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;