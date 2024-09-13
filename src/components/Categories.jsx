import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <div className="container">
        <div className="text-center mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Categories for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Categories
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[300px]"
            >
              {/* image section */}
              <div className="h-[150px]">
                <img
                  src={category.imageUrl}
                  alt={category.categoryName}
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
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
            </div>
          ))}
        </div>
        <div className="flex justify-center">
        <Link to={`/category-list`}
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            >
              View All
              </Link>
          </div>
      </div>
    </div>
  );
};

export default Categories;
