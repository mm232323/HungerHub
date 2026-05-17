import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { useLocation } from "wouter";
import { Utensils } from "lucide-react";

export default function MerchantSetupPage() {
  const { user, isLoaded } = useUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Set merchant role in unsafeMetadata, then redirect to dashboard
    user.update({ unsafeMetadata: { role: "merchant" } })
      .then(() => {
        setLocation("/dashboard");
      })
      .catch(() => {
        // Even if metadata fails, still redirect to dashboard
        setLocation("/dashboard");
      });
  }, [isLoaded, user, setLocation]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 bg-background">
      <div className="bg-primary/10 p-4 rounded-2xl">
        <Utensils className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Setting up your merchant account…</h2>
        <p className="text-muted-foreground text-sm">This will only take a moment.</p>
      </div>
      <div className="flex gap-1.5">
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
}
