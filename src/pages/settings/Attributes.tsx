
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, MoreVertical, Pencil, Trash, Tag, Box, Briefcase } from "lucide-react";

// Enhanced mock data for attributes
const mockCategories = [
  { id: "CAT001", name: "Grains", item_count: 6, created_at: "2025-01-10", description: "Rice, beans, cereals and related food items" },
  { id: "CAT002", name: "Beverages", item_count: 8, created_at: "2025-01-12", description: "Drinks, water, and liquid consumables" },
  { id: "CAT003", name: "Dairy", item_count: 4, created_at: "2025-01-15", description: "Milk and milk-based products" },
  { id: "CAT004", name: "Snacks", item_count: 9, created_at: "2025-01-20", description: "Quick bites and packaged treats" },
];

const mockBrands = [
  { id: "BRD001", name: "Mama Gold", item_count: 2, created_at: "2025-01-15", description: "Premium rice and grain products" },
  { id: "BRD002", name: "Golden Penny", item_count: 5, created_at: "2025-01-16", description: "Flour and pasta products" },
  { id: "BRD003", name: "Dano", item_count: 3, created_at: "2025-01-18", description: "Dairy products and milk" },
  { id: "BRD004", name: "Indomie", item_count: 1, created_at: "2025-01-22", description: "Instant noodles and convenience foods" },
];

const mockUnits = [
  { id: "UNT001", name: "Bag", abbreviation: "bg", item_count: 4, created_at: "2025-02-01", description: "50kg bags for grains and similar items" },
  { id: "UNT002", name: "Carton", abbreviation: "ctn", item_count: 7, created_at: "2025-02-05", description: "Standard box packaging for multiple items" },
  { id: "UNT003", name: "Bottle", abbreviation: "btl", item_count: 6, created_at: "2025-02-08", description: "Individual liquid containers" },
  { id: "UNT004", name: "Kilogram", abbreviation: "kg", item_count: 12, created_at: "2025-02-10", description: "Standard weight measurement" },
  { id: "UNT005", name: "Pack", abbreviation: "pk", item_count: 9, created_at: "2025-02-15", description: "Collection of individual items sold together" },
];

// Form schema for adding/editing categories and brands
const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
  description: z.string().optional(),
});

const brandFormSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters."),
  description: z.string().optional(),
});

const unitFormSchema = z.object({
  name: z.string().min(2, "Unit name must be at least 2 characters."),
  abbreviation: z.string().min(1, "Abbreviation is required"),
  description: z.string().optional(),
});

export default function Attributes() {
  const [activeTab, setActiveTab] = useState("categories");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openUnitDialog, setOpenUnitDialog] = useState(false);

  // Forms
  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const brandForm = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const unitForm = useForm<z.infer<typeof unitFormSchema>>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      description: "",
    },
  });

  // Form submission handlers
  const onCategorySubmit = (values: z.infer<typeof categoryFormSchema>) => {
    console.log(values);
    setOpenCategoryDialog(false);
    categoryForm.reset();
  };

  const onBrandSubmit = (values: z.infer<typeof brandFormSchema>) => {
    console.log(values);
    setOpenBrandDialog(false);
    brandForm.reset();
  };

  const onUnitSubmit = (values: z.infer<typeof unitFormSchema>) => {
    console.log(values);
    setOpenUnitDialog(false);
    unitForm.reset();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Attributes</h1>
            <p className="text-muted-foreground mt-1">
              Manage categories, brands, and units for your inventory
            </p>
          </div>
          <div className="flex gap-4">
            {activeTab === "categories" && (
              <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new product category to organize your inventory.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...categoryForm}>
                    <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                      <FormField
                        control={categoryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Beverages, Electronics" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={categoryForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of this category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Save Category</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}

            {activeTab === "brands" && (
              <Dialog open={openBrandDialog} onOpenChange={setOpenBrandDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} /> Add Brand
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Brand</DialogTitle>
                    <DialogDescription>
                      Create a new brand to associate with your products.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...brandForm}>
                    <form onSubmit={brandForm.handleSubmit(onBrandSubmit)} className="space-y-4">
                      <FormField
                        control={brandForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Samsung, Nike" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={brandForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of this brand" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Save Brand</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}

            {activeTab === "units" && (
              <Dialog open={openUnitDialog} onOpenChange={setOpenUnitDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} /> Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                    <DialogDescription>
                      Create a new measurement unit for your products.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...unitForm}>
                    <form onSubmit={unitForm.handleSubmit(onUnitSubmit)} className="space-y-4">
                      <FormField
                        control={unitForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Kilogram, Liter" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={unitForm.control}
                        name="abbreviation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Abbreviation</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., kg, L" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={unitForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of this unit" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Save Unit</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag size={16} /> Categories
            </TabsTrigger>
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <Briefcase size={16} /> Brands
            </TabsTrigger>
            <TabsTrigger value="units" className="flex items-center gap-2">
              <Box size={16} /> Units
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Product Categories</CardTitle>
                    <CardDescription>
                      Categories to organize your products by type
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{mockCategories.length} Categories</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{category.item_count}</Badge>
                        </TableCell>
                        <TableCell>{category.created_at}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Product Brands</CardTitle>
                    <CardDescription>
                      Manage brands and manufacturers for your products
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{mockBrands.length} Brands</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell className="font-medium">{brand.id}</TableCell>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>{brand.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{brand.item_count}</Badge>
                        </TableCell>
                        <TableCell>{brand.created_at}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Measurement Units</CardTitle>
                    <CardDescription>
                      Units used for measuring and selling products
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{mockUnits.length} Units</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Abbreviation</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUnits.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-medium">{unit.id}</TableCell>
                        <TableCell>{unit.name}</TableCell>
                        <TableCell>{unit.abbreviation}</TableCell>
                        <TableCell>{unit.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{unit.item_count}</Badge>
                        </TableCell>
                        <TableCell>{unit.created_at}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
