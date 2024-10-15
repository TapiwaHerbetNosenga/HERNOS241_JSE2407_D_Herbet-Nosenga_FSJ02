import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, setDoc } from 'firebase/firestore';

export const fetchProducts = async (page = 1) => {
  try {
    let q = query(collection(db, 'products'), limit(20));
    if (page > 1) {
      const offset = (page - 1) * 20;
      const tempSnapshot = await getDocs(query(collection(db, 'products'), limit(offset)));
      const tempLastVisible = tempSnapshot.docs[tempSnapshot.docs.length - 1];
      q = query(collection(db, 'products'), startAfter(tempLastVisible), limit(20));
    }
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return { products };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsBySearch = async (search, page = 1) => {
  try {
    let q = query(collection(db, 'products'), where('title', '==', search), limit(20));
    if (page > 1) {
      const offset = (page - 1) * 20;
      const tempSnapshot = await getDocs(query(collection(db, 'products'), where('title', '>=', search), where('title', '<=', search + '\uf8ff'), limit(offset)));
      const tempLastVisible = tempSnapshot.docs[tempSnapshot.docs.length - 1];
      q = query(collection(db, 'products'), where('title', '>=', search), where('title', '<=', search + '\uf8ff'), startAfter(tempLastVisible), limit(20));
    }
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return { products };
  } catch (error) {
    console.error('Error fetching products by search:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category, page = 1) => {
  try {
    let q = query(collection(db, 'products'), where('category', '==', category), limit(20));
    if (page > 1) {
      const offset = (page - 1) * 20;
      const tempSnapshot = await getDocs(query(collection(db, 'products'), where('category', '==', category), limit(offset)));
      const tempLastVisible = tempSnapshot.docs[tempSnapshot.docs.length - 1];
      q = query(collection(db, 'products'), where('category', '==', category), startAfter(tempLastVisible), limit(20));
    }
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return { products };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductsBySort = async (sortBy, order = 'asc', page = 1) => {
  try {
    let q = query(collection(db, 'products'), orderBy(sortBy, order), limit(20));
    if (page > 1) {
      const offset = (page - 1) * 20;
      const tempSnapshot = await getDocs(query(collection(db, 'products'), orderBy(sortBy, order), limit(offset)));
      const tempLastVisible = tempSnapshot.docs[tempSnapshot.docs.length - 1];
      q = query(collection(db, 'products'), orderBy(sortBy, order), startAfter(tempLastVisible), limit(20));
    }
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return { products };
  } catch (error) {
    console.error('Error fetching products by sort:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, 'products', id);
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

export const addReview = async () => {
  await setDoc(doc(db, "reviews", "1"), {
    name: "jon"
  });
};
