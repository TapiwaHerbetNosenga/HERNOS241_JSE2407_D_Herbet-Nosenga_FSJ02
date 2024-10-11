import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, setDoc } from 'firebase/firestore';

let lastVisible = null;

export const fetchProducts = async (page = 1, search = '', category = '', sortBy = '', order = 'asc') => {
  try {
    let q = query(collection(db, 'products'));

    if (search) {
      q = query(q, where('title', '==', search));
    }

    if (category) {
      q = query(q, where('category', '==', category));
    }

    if (sortBy) {
      q = query(q, orderBy(sortBy, order));
    }

    /*if (page) {
      q = query(q, orderBy(sortBy, order));
    }*/

    q = query(q, limit(20));

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });

    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    console.log('Fetched Products:', products);

    return { products, lastVisibleId: lastVisible ? lastVisible.id : null };
  } catch (error) {
    console.error('Error fetching products:', error);
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

export const addReview = async () =>{


await setDoc(doc(db, "reviews", "1" ), {
  "name":"jon",
})

}