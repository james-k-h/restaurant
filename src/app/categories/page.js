'use client';
import { useEffect, useState } from 'react';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';
import toast from 'react-hot-toast';
import DeleteButton from '../components/ui/DeleteButton';

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

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });
    fetchCategories();
  }
  if (profileLoading) {
    return 'Loading...';
  }

  if (!profileData.admin) {
    return 'Not an Administrator';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto h-screen ">
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
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-lightBlack font-semibold">
          Existing Categories:
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c.name}
              className="bg-lightBlack text-white flex rounded-xl 
              items-center
              p-2 px-4 gap-1 mb-2"
            >
              <div className="grow ">{c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <DeleteButton
                  label={'Delete'}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default CategoriesPage;
