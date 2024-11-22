import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function GetNowButton() {
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="relative">
        {/* Animated border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 animate-border-flow" />
        
        {/* Rotating highlight */}
        <div className="absolute -inset-2 rounded-full">
          <div className="absolute inset-0 rounded-full animate-spin-slow overflow-hidden">
            <div className="w-[200%] h-[200%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,#10b981_360deg)]" />
          </div>
        </div>
        
        {/* Main button */}
        <motion.button
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Get Now</span>
          <Sparkles className="w-5 h-5 relative z-10" />
          
          {/* Hover gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ type: "tween", ease: "easeInOut" }}
          />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Outer glow effect */}
          <div className="absolute -inset-3 bg-emerald-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}