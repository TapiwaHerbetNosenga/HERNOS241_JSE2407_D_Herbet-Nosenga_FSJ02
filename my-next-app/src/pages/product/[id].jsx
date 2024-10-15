import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import SubmitReview from '@/components/SubmitReview';
import { fetchProductById } from '../api/api';

const DetailedProducts = ({ product, error }) => {
  const [lastTap, setLastTap] = useState(null);
  const router = useRouter();

  const handleDoubleTap = async (review) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      try {
        const response = await fetch('/api/deleteReview', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, review }),
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          router.reload();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error deleting review: ', error);
        alert('Failed to delete review');
      }
    }
    setLastTap(now);
  };

  if (error) return <div className="error">{error}</div>;

  const sortedReviews = product.reviews.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <button onClick={goBack} className="Return-but bg-red-900">
        Return
      </button>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Head>
      <div className="product-detail-container">
        <div className="product-image">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            layout="responsive"
            objectFit="cover"
            quality={75}
          />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          {product.tags && (
            <p className="tags">Tags: {product.tags.join(", ")}</p>
          )}
          <p className="rating">Rating: {product.rating} / 5</p>
          <p className="stock">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="reviews">
            <h2>Reviews</h2>
            {sortedReviews.length > 0 ? (
              <div className="review-container">
                {sortedReviews.map((review) => (
                  <div
                    key={`${review.reviewerEmail}-${review.date}`}
                    className="review"
                    onClick={() => handleDoubleTap(review)}
                  >
                    <p>
                      <strong>{review.reviewerName}</strong> Date:{" "}
                      {new Date(review.date).toLocaleDateString("en-US")}
                    </p>
                    <p>Rated: {review.rating}/5</p>
                    <p>Comment: {review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
          <SubmitReview productId={product.id} />
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
        .product-detail-container {
          font-family: Roboto, sans-serif;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
          background-color: #f5f5f5;
          border-radius: 8px;
        }
        .product-image {
          flex: 1;
          max-width: 400px;
          position: relative;
        }
        .product-info {
          flex: 2;
          padding: 20px;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #333;
        }
        .price {
          font-size: 1.8rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 10px;
        }
        .category {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin-bottom: 15px;
        }
        .description {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #555;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .tag {
          background-color: #f5f5f5;
          border: 1px solid #f5d700;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .rating-star {
          color: #f5d700;
          font-size: 1.2rem;
        }
        .stock {
          font-size: 1.2rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 15px;
        }
        .reviews {
          margin-top: 20px;
        }
        .review {
          border-top: 1px solid #e1e1e1;
          padding: 10px;
          margin-top: 10px;
          width: 100%;
          background-color: #ffc107;
          border-radius: 8px;
          color: #fff;
        }
        .review p {
          font-weight: bold;
        }
        .error {
          color: #e74c3c;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .product-detail-container {
            flex-direction: column;
            align-items: center;
          }
          .product-image {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const product = await fetchProductById(id);
    return { props: { product } };
  } catch (error) {
    return { props: { error: "Product failed to load, try again" } };
  }
}

export default DetailedProducts;
