import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [value, setValue] = useState("");

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [placeholders]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e);
          }}
          className="w-full px-6 py-4 bg-zinc-900 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder={placeholders[currentPlaceholder]}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
          <span className="text-sm text-zinc-500">{value.length} characters</span>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Search →
          </button>
        </div>
      </div>
    </form>
  );
}