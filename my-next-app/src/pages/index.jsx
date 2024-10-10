import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { fetchProducts } from '../api/api';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryDropdown from '../components/CategoryDropdown';
import SortDropdown from '../components/SortDropdown';

export default function ProductListing({ initialProducts, initialPage }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [page, setPage] = useState(initialPage || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { search, category, sortBy, order } = router.query;
  const lastVisible = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProducts(page, search, category, sortBy, order, lastVisible.current);
        setProducts(productData.products);
        lastVisible.current = productData.lastVisible;
        console.log('Fetched Products:', productData.products);
      } catch (err) {
        setError("Failed to load products");
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page, search, category, sortBy, order]);

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    router.push(`/?page=${nextPage}`, undefined, { shallow: true });
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(page - 1, 1);
    setPage(prevPage);
    router.push(`/?page=${prevPage}`, undefined, { shallow: true });
  };

  const handleReset = () => {
    router.push('/');
  };

  return (
    <div className="container flex-center">
      <h1 className="title">Maccy's E-Commerce Store</h1>
      <SearchBar />
      <CategoryDropdown />
      <SortDropdown />
      <div className="reset-container">
        <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            <ProductList products={products} />
          </div>
          <div className="pagination">
            <button className="btn" onClick={handlePrevPage} disabled={page === 1}>
              ← Previous
            </button>
            <span className="page-number">Page {page}</span>
            <button className="btn" onClick={handleNextPage}>
              Next →
            </button>
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-family: 'Roboto', sans-serif;
          font-size: 2.5rem;
          font-weight: bold;
          color: #0070f3;
        }

        .reset-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .reset-btn {
          background-color: #f5d700;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .reset-btn:hover {
          background-color: #e5c600;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .pagination {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          margin: 0 10px;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #005bb5;
        }

        .page-number {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .loading-message,
        .error-message {
          text-align: center;
          margin-top: 50px;
          font-size: 1.5rem;
          color: #F5D700;
        }

        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const page = 1;
    const search = context.query.search || '';
    const category = context.query.category || '';
    const sortBy = context.query.sortBy || '';
    const order = context.query.order || '';
    const productsData = await fetchProducts(page, search, category, sortBy, order);
    return { props: { initialProducts: productsData.products, initialPage: page, lastVisible: productsData.lastVisible } };
  } catch (error) {
    return { props: { error: "Products have failed to load, try again." } };
  }
}
