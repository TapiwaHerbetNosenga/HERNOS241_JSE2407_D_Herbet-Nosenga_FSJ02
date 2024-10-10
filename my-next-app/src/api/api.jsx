import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';

export const fetchProducts = async (page = 1, search = '', category = '', sortBy = '', order = 'asc', lastVisible = null) => {
  try {
    let q = query(collection(db, 'products'));

    if (search) {
      q = query(q, where('title', '>=', search), where('title', '<=', search + '\uf8ff'));
    }

    if (category) {
      q = query(q, where('category', '==', category));
    }

    if (sortBy) {
      q = query(q, orderBy(sortBy, order));
    }

    q = query(q, limit(20));

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log('Fetched Products:', products);

    return { products, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const fetchProductById = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDocs(docRef);

  if (!docSnap.exists()) {
    throw new Error('Failed to fetch product');
  }

  return { ...docSnap.data(), id: docSnap.id };
};

export const fetchProductByKey = async (key) => {
  const docRef = doc(db, 'products', key);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Failed to fetch product');
  }

  return { ...docSnap.data(), id: docSnap.id };
};

export const fetchCategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let categories = [];
  querySnapshot.forEach((doc) => {
    if (doc.id === 'allCategories') {
      categories = doc.data().categories;
    }
  });
  return categories;
};


