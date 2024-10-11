import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AddReview = ({ productId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, rating, comment }),
      });
      if (response.ok) {
        setRating(0);
        setComment('');
        router.reload();
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Failed to add review', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
          />
        </label>
      </div>
      <div>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default AddReview;
