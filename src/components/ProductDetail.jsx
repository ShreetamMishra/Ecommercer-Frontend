import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  // const [wishlistString, setWishlistString] = useState("Add to Wishlist");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://ecommerce-backend-7jr9.onrender.com/product/`);
        const products = response.data;
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          const foundCategory = { id: foundProduct.categoryId, categoryName: 'Example Category' };
          setCategory(foundCategory);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // const handleAddToWishlist = async () => {
  //   try {
  //     const response = await axios.post(`https://ecommerce-backend-7jr9.onrender.com/wishlist/add`, {
  //       id: product.id,
  //       token
  //     });
  //     if (response.status === 201) {
  //       setIsAddedToWishlist(true);
  //       setWishlistString("Added to Wishlist");
  //     }
  //   } catch (err) {
  //     console.error('Error adding to wishlist:', err);
  //   }
  // };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please log in first!");
      return;
    }
    try {
      const response = await axios.post(`https://ecommerce-backend-7jr9.onrender.com/cart/add?token=${token}`, {
        productId: product.id,
        quantity
      });
      if (response.status === 201) {
        alert("Product added to the cart!");
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="mt-10 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">Product details</p>
          </div>
          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src={product.imageURL}
                alt={product.name}
                className="max-w-full max-h-96 object-contain rounded-lg shadow-lg object-contain"
              />
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-2">{product.name}</h4>
              <h6 className="text-lg italic text-gray-600 mb-2">{category?.categoryName || 'Category'}</h6>
              <h6 className="text-2xl font-bold mb-2">₹{product.price}</h6>
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <span className="bg-gray-200 p-2">Quantity</span>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-2 py-1"
                    min="1"
                  />
                </div>
                <button
                  type="button"
                  className="btn bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex gap-4">
                {/* <button
                  className={`btn ${isAddedToWishlist ? 'bg-gray-500' : 'bg-gray-300'} text-white px-4 py-2 rounded-md shadow-md transition`}
                  onClick={handleAddToWishlist}
                >
                  {wishlistString}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
