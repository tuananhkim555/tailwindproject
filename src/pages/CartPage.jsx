// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('All'); // Trạng thái để lưu kích cỡ được chọn
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; //thuế
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleIncreaseQuantity = (productId, size) => {
    updateQuantity(productId, size, 1);
  };

  const handleDecreaseQuantity = (productId, size) => {
    updateQuantity(productId, size, -1);
  };

  const handleRemoveProduct = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Nhóm sản phẩm theo kích cỡ
  const groupedBySize = cart.reduce((acc, item) => {
    if (!acc[item.size]) {
      acc[item.size] = [];
    }
    acc[item.size].push(item);
    return acc;
  }, {});

  // Danh sách kích cỡ có trong giỏ hàng
  const sizes = ['All', ...Object.keys(groupedBySize)];

  // Lọc sản phẩm theo kích cỡ được chọn
  const filteredProducts = selectedSize === 'All'
    ? cart
    : groupedBySize[selectedSize] || [];

  return (
    <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
        <button
          onClick={handleGoBack}
          className="bg-gray-300 text-black px-4 py-2 rounded mb-4 hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mb-4">Your product list</h1>
        <div className="mb-4">
          <label htmlFor="sizeFilter" className="mr-4">Filter by size:</label>
          <select
            id="sizeFilter"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border p-2 rounded"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <p>No products to display for the selected size.</p>
        ) : (
          filteredProducts.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center mb-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-bold">{item.name} ({item.size})</h2>
                <div className="flex items-center mt-2">
                  <button
                    className="border px-2 py-1 hover:bg-gray-200 transition-colors"
                    onClick={() => handleDecreaseQuantity(item.id, item.size)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="border px-2 py-1 hover:bg-gray-200 transition-colors"
                    onClick={() => handleIncreaseQuantity(item.id, item.size)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                <button
                  className="text-red-500 mt-2 hover:text-red-700 transition-colors"
                  onClick={() => handleRemoveProduct(item.id, item.size)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3 ml-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between font-bold mb-4">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <button className="bg-black text-white w-full py-2 rounded">Pay now</button>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Promo Code</h3>
          <input type="text" className="border w-full p-2 rounded" placeholder="Enter promo code" />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
