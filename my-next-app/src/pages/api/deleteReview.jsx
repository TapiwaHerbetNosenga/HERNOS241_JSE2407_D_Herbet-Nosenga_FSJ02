import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { productId, review } = req.body;

    const db = getFirestore(app);
    const productRef = doc(db, 'products', productId);

    try {
      await updateDoc(productRef, {
        reviews: arrayRemove(review),
      });
      res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (error) {
      console.error('Error deleting review: ', error);
      res.status(500).json({ message: 'Failed to delete review' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
