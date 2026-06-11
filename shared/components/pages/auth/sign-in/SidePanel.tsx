import React from "react";
import Image from "next/image";

function SidePanel({ role }: { role: "customer" | "merchant" | null }) {

  const isMerchant = role === "merchant";

  return (
    <div className="hidden lg:block lg:w-[45%] xl:w-[55%] relative overflow-hidden bg-[#1B191A]">
      <Image
        src={isMerchant ? "/images/auth/merchant_bg.jpg" : "/images/auth/customer_bg.jpg"}
        alt={isMerchant ? "Grow your food empire today" : "Flavors you'll absolutely crave"}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 0vw, 55vw"
      />
    </div>
  );
}

export default SidePanel;
