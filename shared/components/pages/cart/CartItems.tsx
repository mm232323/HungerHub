import React from "react";
import { Button } from "../../ui/button";
import { Minus, Plus } from "lucide-react";

function CartItems({items, updateItems}: {items: { id: number; name: string; price: number; quantity: number; image: string; merchantId: number }[]; updateItems: (items: any) => void}) {
  return (
    <>
      {" "}
      <h1 className="text-2xl font-bold">Checkout</h1>
      {/* Cart Items */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Order</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-2xl bg-card"
            >
              <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-secondary rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, quantity: i.quantity - 1 }
                                : i,
                            ),
                          );
                        } else {
                          updateItems(items.filter((i) => i.id !== item.id));
                        }
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        updateItems(
                          items.map((i) =>
                            i.id === item.id
                              ? { ...i, quantity: i.quantity + 1 }
                              : i,
                          ),
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CartItems;
