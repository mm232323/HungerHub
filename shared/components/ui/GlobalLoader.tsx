"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer glowing spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#F97316] border-r-[#F97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-br from-[#FB923C] to-[#EA580C] rounded-full flex items-center justify-center shadow-lg relative z-10"
        >
          <Utensils className="text-white w-7 h-7" />
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-6 text-stone-600 font-medium tracking-wide text-sm"
      >
        Serving up something delicious...
      </motion.p>
    </div>
  );
}
