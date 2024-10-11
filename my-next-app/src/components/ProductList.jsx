import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const seenIds = new Set();

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => {
          if (seenIds.has(product.id)) {
            console.warn(`Duplicate key found: ${product.id}`);
          } else {
            seenIds.add(product.id);
          }
          return <ProductCard key={product.id} product={product} />;
        })
      ) : (
        <p>No products to display.</p>
      )}
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(250px, 1fr)); /* Allow columns to be wider */
          gap: 90px;
        }

        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(250px, 1fr));
            gap: 50px;
          }
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, minmax(250px, 1fr));
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;
