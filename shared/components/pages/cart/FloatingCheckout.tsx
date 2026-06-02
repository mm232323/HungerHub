import { motion } from "framer-motion";
import React from "react";
import { Button } from "../../ui/button";

function FloatingCheckout({ handleCheckout, createOrder, total }: { handleCheckout: () => void; createOrder: { isPending: boolean }; total: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t z-50">
      <div className="container max-w-2xl mx-auto">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full h-14 rounded-full font-bold text-lg shadow-lg"
            onClick={handleCheckout}
            disabled={createOrder.isPending}
          >
            {createOrder.isPending
              ? "Processing..."
              : `Checkout • $${total.toFixed(2)}`}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default FloatingCheckout;
