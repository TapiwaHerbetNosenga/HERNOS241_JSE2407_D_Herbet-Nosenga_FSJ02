import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, review } = req.body;

    const db = getFirestore(app);
    const productRef = doc(db, 'products', productId);

    try {
      await updateDoc(productRef, {
        reviews: arrayUnion(review),
      });
      res.status(200).json({ message: 'Review added successfully!' });
    } catch (error) {
      console.error('Error adding review: ', error);
      res.status(500).json({ message: 'Failed to add review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
