import { useState } from "react";
import { useListPromotions, useCreatePromotion } from "@/utils/api";
import DashboardLayout from "../layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/alerts/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/alerts/dialog";
import { Ticket, Percent, Truck, Megaphone, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardMarketing() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: promotions, isLoading, refetch } = useListPromotions({
    query: { queryKey: ["/api/promotions"] }
  });

  const createPromotion = useCreatePromotion({
    mutation: {
      onSuccess: () => {
        toast({ title: "Promotion created successfully" });
        setIsAddOpen(false);
        refetch();
      }
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="h-5 w-5" />;
      case "free_delivery": return <Truck className="h-5 w-5" />;
      default: return <Ticket className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketing & Offers</h1>
            <p className="text-muted-foreground mt-1">Run campaigns to attract and retain customers.</p>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> New Campaign</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Promotion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Campaign Title</Label>
                  <Input placeholder="e.g. Summer Special 20%" />
                </div>
                <div className="space-y-2">
                  <Label>Promo Code (Optional)</Label>
                  <Input placeholder="SUMMER20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Discount Value</Label>
                    <Input type="number" placeholder="20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount Type</Label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                      <option value="free_delivery">Free Delivery</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full" onClick={() => {
                  createPromotion.mutate({
                    data: {
                      title: "Summer Special 20%",
                      type: "percentage",
                      discount: 20,
                      code: "SUMMER20",
                      startDate: new Date().toISOString(),
                      endDate: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
                      isActive: true
                    }
                  });
                }}>Launch Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hero Banner for Feed Promotion */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 text-primary-foreground/10">
            <Megaphone className="h-64 w-64" />
          </div>
          <div className="relative z-10 space-y-3 max-w-xl">
            <h2 className="text-2xl font-bold">Boost your visibility on the Discover feed</h2>
            <p className="text-primary-foreground/90">
              Get featured at the top of the feed for users in your area. Sponsored stories get 3x more engagement.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Button variant="secondary" size="lg" className="rounded-full font-bold">Create Story Ad</Button>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-4">Active Promotions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)
          ) : promotions?.map(promo => (
            <Card key={promo.id} className={promo.isActive ? "border-primary/50 shadow-sm" : "opacity-60"}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{promo.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {promo.code ? <code className="bg-muted px-2 py-0.5 rounded text-primary font-bold">{promo.code}</code> : "Auto-applied"}
                  </CardDescription>
                </div>
                <div className={`p-2 rounded-lg ${promo.isActive ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                  {getIcon(promo.type)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mt-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Usage</p>
                    <p className="font-bold text-lg">{promo.usageCount || 0} times</p>
                  </div>
                  <Badge variant={promo.isActive ? "default" : "secondary"}>
                    {promo.isActive ? "Active" : "Expired"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}