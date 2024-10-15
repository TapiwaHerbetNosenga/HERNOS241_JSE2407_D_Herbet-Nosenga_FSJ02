import { useState } from 'react';
import { useRouter } from 'next/router';

const SubmitReview = ({ productId, existingReview = null }) => {
  const initialReview = existingReview || {
    reviewerName: '',
    reviewerEmail: '',
    rating: '',
    comment: '',
    date: new Date().toISOString(),
  };

  const [review, setReview] = useState(initialReview);
  const router = useRouter();

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = existingReview ? '/api/editReview' : '/api/addReview';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, review }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.reload();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error submitting review: ', error);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="reviewerName"
        value={review.reviewerName}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="reviewerEmail"
        value={review.reviewerEmail}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <select
        name="rating"
        value={review.rating}
        onChange={handleChange}
        required
      >
        <option value="">Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <textarea
        name="comment"
        value={review.comment}
        onChange={handleChange}
        placeholder="Your Comment"
        required
      />
      <button type="submit">{existingReview ? 'Update Review' : 'Submit Review'}</button>
    </form>
  );
};

export default SubmitReview;
