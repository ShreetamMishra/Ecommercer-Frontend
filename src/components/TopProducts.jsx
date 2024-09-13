import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; // Imported FaStar from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-7jr9.onrender.com/product/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Transform API data to match the component's expected format
        const transformedData = data.map(product => ({
          id: product.id,
          img: product.imageURL,
          title: product.name,
          price: product.price,
          rating: 0, // Set default rating or adjust based on API if available
          color: '', // Set default color or adjust based on API if available
          aosDelay: '0' // Set a default value or adjust dynamically if needed
        }));
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAll = () => {
    navigate('/product-list'); // Navigate to ProductList page
  };

  // Handle navigation to product details
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Selling Products for you</p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, explicabo?
          </p>
        </div>
        {/* Body */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* Card section */}
            {products.slice(0, 5).map(product => (
              <div
                data-aos="fade-up"
                data-aos-delay="0" // You might want to adjust the delay dynamically if needed
                key={product.id}
                className="space-y-3 text-center cursor-pointer " // Add cursor pointer to indicate clickable items
                onClick={() => handleProductClick(product.id)} // Add click handler
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{product.title}</h3>
                  <h3 className="font-semibold">₹{product.price}</h3>
                  <div className="flex justify-center items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    {/* Add more dynamic rating logic if needed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* View all button */}
          <div className="flex justify-center">
            <button
              onClick={handleViewAll} // Add click handler for navigation
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
