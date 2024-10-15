import { getFirestore, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, review } = req.body;
    
    const db = getFirestore(app);
    const productRef = doc(db, 'products', productId);

    try {
      // Fetch the product to get existing reviews
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();

      // Find and remove the old review
      const oldReview = productData.reviews.find(r => r.reviewerEmail === review.reviewerEmail);
      if (oldReview) {
        await updateDoc(productRef, {
          reviews: arrayRemove(oldReview),
        });
      }

      // Add the new review
      await updateDoc(productRef, {
        reviews: arrayUnion(review),
      });

      res.status(200).json({ message: 'Review updated successfully!' });
    } catch (error) {
      console.error('Error updating review: ', error);
      res.status(500).json({ message: 'Failed to update review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
