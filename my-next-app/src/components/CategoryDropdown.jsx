import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCategories } from '../pages/api/api';

const CategoryDropdown = () => {
  const router = useRouter();
  const { category } = router.query;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    router.push(`/?category=${e.target.value}`);
  };

  return (
    <div className="category-dropdown">
      <select value={category || ''} onChange={handleCategoryChange} className="dropdown">
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <style jsx>{`
        .category-dropdown {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 10px;
          font-size: 1rem;
          border: 2px solid #f5d700;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .dropdown:hover {
          border-color: #e5c600;
        }
      `}</style>
    </div>
  );
};

export default CategoryDropdown;
