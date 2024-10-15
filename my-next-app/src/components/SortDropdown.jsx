import { useRouter } from 'next/router';

const SortDropdown = () => {
  const router = useRouter();
  const { sortBy, order } = router.query;

  const handleSortChange = (e) => {
    const [sortField, sortOrder] = e.target.value.split(':');
    router.push(`/?sortBy=${sortField}&order=${sortOrder}`);
  };

  return (
    <div className="sort-dropdown">
      <select value={`${sortBy}:${order}` || ''} onChange={handleSortChange} className="dropdown">
        <option value="">Sort By</option>
        <option value="price:asc">Price: Low to High</option>
        <option value="price:desc">Price: High to Low</option>
        <option value="rating:asc">Rating: Low to High</option>
        <option value="rating:desc">Rating: High to Low</option>
      </select>
      <style jsx>{`
        .sort-dropdown {
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

export default SortDropdown;
