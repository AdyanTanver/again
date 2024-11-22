import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider';
import { CustomCursor } from './components/cursor';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Custom navigate function to handle redirects properly
const handleNavigate = (to: string) => {
  // Ensure the URL is properly formatted
  if (to.startsWith('http')) {
    // Extract the path from the full URL
    try {
      const url = new URL(to);
      to = url.pathname + url.search + url.hash;
    } catch (e) {
      // If URL parsing fails, fallback to /search
      to = '/search';
    }
  }
  return to;
};

function Root() {
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      navigate={handleNavigate}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#000000",
          colorBackground: "#ffffff",
          colorText: "#000000",
          colorInputText: "#000000",
          colorInputBackground: "#ffffff",
          colorSuccess: "#22c55e"
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton"
        },
        elements: {
          rootBox: "mx-auto",
          card: "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800",
          headerTitle: "text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-500 dark:text-gray-400",
          socialButtonsBlockButton: "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800",
          dividerLine: "bg-gray-200 dark:bg-gray-800",
          dividerText: "text-gray-500 dark:text-gray-400",
          formFieldLabel: "text-gray-900 dark:text-white",
          formFieldInput: "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white",
          formButtonPrimary: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200",
          footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
          identityPreviewText: "text-gray-900 dark:text-white",
          identityPreviewEditButton: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        }
      }}
    >
      <BrowserRouter>
        <ThemeProvider defaultTheme="light">
          <CustomCursor />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);