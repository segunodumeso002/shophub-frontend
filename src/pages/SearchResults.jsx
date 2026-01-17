import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({ search: query, page: currentPage, limit });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Searching...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-6">
        {products.length} results for "{query}"
      </p>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">No products found</p>
          <p className="text-gray-500">Try different keywords</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
