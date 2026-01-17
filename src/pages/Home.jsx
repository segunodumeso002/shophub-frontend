import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAll({ limit: 20 }),
          categoryAPI.getAll()
        ]);
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <section className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="bg-white p-3 sm:p-6 rounded-lg text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">📦</div>
              <h3 className="font-semibold text-gray-800 text-xs sm:text-base">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
