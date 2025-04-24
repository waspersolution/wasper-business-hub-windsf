
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface POSProductListProps {
  viewMode: "grid" | "list";
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export default function POSProductList({ viewMode, products, onProductSelect }: POSProductListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex-1">
      <div 
        className={`${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'flex flex-col gap-2'}`}
        tabIndex={-1}
      >
        {products.map((product) => (
          viewMode === 'grid' ? (
            <div 
              key={product.id} 
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer focus:ring-2 focus:ring-wasper-primary focus:outline-none p-3 border rounded-lg"
              onClick={() => onProductSelect(product)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onProductSelect(product)}
            >
              <div className="bg-wasper-light h-24 flex items-center justify-center rounded-md">
                <div className="text-2xl font-bold text-wasper-primary">
                  {product.name.substring(0, 1)}
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium truncate">{product.name}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-semibold">₦{product.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Stock: {product.stock}</div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              key={product.id} 
              className="p-2 border rounded-md flex items-center hover:bg-slate-50 cursor-pointer focus:ring-2 focus:ring-wasper-primary focus:outline-none"
              onClick={() => onProductSelect(product)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onProductSelect(product)}
            >
              <div className="bg-wasper-light h-10 w-10 rounded-md flex items-center justify-center mr-3">
                <div className="font-bold text-wasper-primary">
                  {product.name.substring(0, 1)}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-muted-foreground">Stock: {product.stock}</div>
              </div>
              <div className="font-semibold">₦{product.price.toLocaleString()}</div>
            </div>
          )
        ))}
        
        {products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}
