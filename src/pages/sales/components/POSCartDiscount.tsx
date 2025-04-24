
interface CartDiscountProps {
  discount: number;
}

export function POSCartDiscount({ discount }: CartDiscountProps) {
  if (discount <= 0) return null;
  
  return (
    <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded-md">
      <div className="text-sm text-green-700 font-medium">
        Customer group discount: {discount}%
      </div>
    </div>
  );
}
