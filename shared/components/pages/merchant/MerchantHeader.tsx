import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { ChevronLeft, Search } from "lucide-react";
import { Merchant } from "@/types";

function MerchantHeader({ merchant }: { merchant: Merchant }) {
  return (
    <div className="relative h-64 md:h-80">
      <img
        src={merchant.coverImage}
        alt={merchant.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Link href="/discover">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full backdrop-blur-md"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full backdrop-blur-md"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default MerchantHeader;
