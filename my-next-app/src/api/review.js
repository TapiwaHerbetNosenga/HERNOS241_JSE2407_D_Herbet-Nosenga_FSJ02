import { db } from '@/firebaseConfig';
import { collection, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { productId, rating, comment } = req.body;
    const newReview = {
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerEmail: session.user.email,
      reviewerName: session.user.name,
    };

    try {
      await addDoc(collection(db, 'products', productId, 'reviews'), newReview);
      res.status(200).json({ message: 'Review added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add review' });
    }
  } else if (req.method === 'PUT') {
    const { productId, reviewId, rating, comment } = req.body;
    const updatedReview = {
      rating,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
      await setDoc(reviewRef, updatedReview, { merge: true });
      res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review' });
    }
  } else if (req.method === 'DELETE') {
    const { productId, reviewId } = req.body;

    try {
      const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
      await deleteDoc(reviewRef);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
