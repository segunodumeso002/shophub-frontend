import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.slug}`} className="bg-white border rounded-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image_url || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px]">{product.name}</h3>
        <div className="flex items-center gap-1 mb-1 sm:mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-primary text-primary sm:w-3.5 sm:h-3.5" />
          ))}
          <span className="text-[10px] sm:text-xs text-gray-600 ml-1">(4.5)</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-lg sm:text-2xl font-bold text-gray-900">${product.price}</span>
          {product.compare_at_price && (
            <>
              <span className="text-[10px] sm:text-sm text-gray-500 line-through">${product.compare_at_price}</span>
              <span className="text-[10px] sm:text-sm font-semibold text-red-600 bg-red-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded">-{discount}%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
