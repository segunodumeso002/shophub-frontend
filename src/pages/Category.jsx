import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    fetchProducts();
  }, [slug, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll({ category: slug, page: currentPage, limit });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No products found in this category</p>
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
