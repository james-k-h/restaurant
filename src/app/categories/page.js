'use client';
import { useEffect, useState } from 'react';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating your category...'
        : 'Creating your new category...',
      success: editedCategory ? 'Category Updated' : 'Category Created',
      error: 'Error, please try again',
    });
  }

  if (profileLoading) {
    return 'Loading...';
  }

  if (!profileData.admin) {
    return 'Not an Administrator';
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label className="font-semibold text-lightBlack">
              {editedCategory ? 'Update Category:' : 'New Category Name:'}
              {editedCategory && (
                <>
                  {' '}
                  <i>{editedCategory.name}</i>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2">
            <button type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-lightBlack font-semibold">Edit Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <button
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              key={c.name}
              className="bg-lightBlack text-white rounded-xl p-2 px-4 gap-1 cursor-pointer mb-2"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};
export default CategoriesPage;
