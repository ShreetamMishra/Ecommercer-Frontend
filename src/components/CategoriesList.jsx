import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isEditMode, setIsEditMode] = useState(false); // Track if it's edit mode
  const [selectedCategory, setSelectedCategory] = useState(null); // Store the category being edited
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-7jr9.onrender.com/catgory/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategoryClick = () => {
    setIsModalOpen(true); // Open modal
    setIsEditMode(false); // Set to add mode
    setNewCategory({
      categoryName: '',
      description: '',
      imageUrl: '',
    }); // Reset form
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && selectedCategory) {
      // Update category
      try {
        await axios.post(`https://ecommerce-backend-7jr9.onrender.com/catgory/update/${selectedCategory.id}`, newCategory);
        console.log('Category successfully updated');
      } catch (error) {
        console.error('Error updating category:', error);
      }
    } else {
      // Create new category
      try {
        await axios.post('https://ecommerce-backend-7jr9.onrender.com/catgory/create', newCategory);
        console.log('Category successfully created');
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
    setIsModalOpen(false); // Close modal after submission
    const response = await axios.get('https://ecommerce-backend-7jr9.onrender.com/catgory/list');
    setCategories(response.data);
  };

  const handleEditCategoryClick = (category) => {
    setSelectedCategory(category); // Set the category to be edited
    setNewCategory({
      categoryName: category.categoryName,
      description: category.description,
      imageUrl: category.imageUrl,
    });
    setIsModalOpen(true); // Open modal
    setIsEditMode(true); // Set to edit mode
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container mx-auto">
          <div className="relative flex justify-center items-center mb-24 mt-14">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Best Categories</h1>
              <p className="text-xs text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <button
              onClick={handleAddCategoryClick} // Open modal on click
              className="absolute right-0 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
            >
              Add Category
            </button>
          </div>

          {/* Body section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[300px] mt-20"
              >
                {/* image section */}
                <div className="">
                  <img
                    src={category.imageUrl}
                    alt={category.categoryName}
                    className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md object-contain"
                  />
                </div>
                {/* details section */}
                <div className="p-4 text-center">
                  {/* star rating */}
                  <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                  <h1 className="text-xl font-bold">{category.categoryName}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {category.description}
                  </p>
                  <Link to={`/category/${category.id}`}>
                    <button className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                      View Products
                    </button>
                  </Link>

                </div>
                <div className='flex justify-center mb-2'>
                  <button
                    onClick={() => handleEditCategoryClick(category)} // Open edit modal on click
                    className="ml-2 bg-blue-500 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-blue-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-center w-full">
                {isEditMode ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black">
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <div>
                <label className="block font-semibold">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={newCategory.categoryName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newCategory.imageUrl}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
