import { useState } from "react";
import { useGetDashboardProducts, useCreateProduct, useDeleteProduct } from "@/utils/api";
import DashboardLayout from "../layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/alerts/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/alerts/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardProducts() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: products, isLoading, refetch } = useGetDashboardProducts({
    query: { queryKey: ["/dashboard/products"] }
  });

  const deleteProduct = useDeleteProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Product deleted" });
        refetch();
      }
    }
  });

  // Simple client-side filter
  const filteredProducts = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products Menu</h1>
            <p className="text-muted-foreground mt-1">Manage your items, pricing, and availability.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="e.g. Spicy Chicken Sandwich" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input type="number" placeholder="12.99" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input placeholder="e.g. Burgers" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <Button className="w-full" onClick={() => setIsAddOpen(false)}>Save Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-12 w-12 rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-12 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={product.isAvailable} />
                      <span className="text-xs text-muted-foreground">{product.isAvailable ? 'Active' : 'Hidden'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10"
                          onClick={() => deleteProduct.mutate({ id: product.id })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}