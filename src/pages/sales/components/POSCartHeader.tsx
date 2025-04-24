
interface CartHeaderProps {
  itemCount: number;
}

export function POSCartHeader({ itemCount }: CartHeaderProps) {
  return (
    <h2 className="text-lg font-semibold mb-3 text-wasper-primary flex items-center justify-between">
      <span>Cart</span>
      <span className="text-sm bg-wasper-light text-wasper-primary px-2 py-0.5 rounded-full">
        {itemCount} items
      </span>
    </h2>
  );
}
