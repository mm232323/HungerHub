import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function SidePanel({ role }: { role: "customer" | "merchant" | null }) {

  const isMerchant = role === "merchant";

  return (
    <div className="hidden lg:flex relative rounded-[25px] flex-1 overflow-hidden m-[20px] items-center justify-center bg-stone-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={role || "empty"}
          initial={{ opacity: 0, scale: 0.95, rotate: -2, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, rotate: 2, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src={isMerchant ? "/images/auth/merchant_bg.jpg" : "/images/auth/customer_bg.jpg"}
            alt={isMerchant ? "Grow your food empire today" : "Flavors you'll absolutely crave"}
            className="w-full h-auto object-cover rounded-[25px]"
            priority
            height={2200}
            width={1700}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SidePanel;
