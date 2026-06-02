import React from "react";
import { Label } from "../../ui/label";
import { CreditCard, MapPin, Ticket } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

function DeliveryDetails({address, updateAddress}: {address: string; updateAddress: (address: string) => void}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Delivery Details</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-muted-foreground flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" /> Delivery Address
          </Label>
          <Input
            id="address"
            placeholder="123 Main St, Apt 4B"
            value={address}
            onChange={(e) => updateAddress(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payment Method
          </Label>
          <div className="flex items-center p-3 border rounded-xl gap-3 cursor-pointer hover:border-primary transition-colors">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Credit Card</p>
              <p className="text-xs text-muted-foreground">
                **** **** **** 4242
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary h-8">
              Change
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="promo"
            className="text-muted-foreground flex items-center gap-2"
          >
            <Ticket className="h-4 w-4" /> Promo Code
          </Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              placeholder="Enter code"
              className="h-12 rounded-xl flex-1"
            />
            <Button className="h-12 rounded-xl px-6" variant="secondary">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryDetails;
