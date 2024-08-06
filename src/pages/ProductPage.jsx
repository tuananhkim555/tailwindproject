// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductPage() {
  const { addToCart } = useContext(CartContext);
  const [size, setSize] = useState('M');

  const product = {
    id: 1,
    name: 'Áo Polo Bear Oxford Fit Tùy Chỉnh',
    price: 99.00,
    originalPrice: 132.00,
    description: 'Áo polo xanh với thiết kế cổ điển. Làm từ vải cotton mềm mại và mịn màng.',
    image: '../assets/1059920671-ao-khoac-nu-hinh-chu-soc-ngo-nghinh-3.jpg',
    size, // Thêm kích cỡ vào sản phẩm
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="p-8">
      <div className="flex">
        <div className="w-1/2">
          <img src={product.image} alt="Sản phẩm" className="w-200" />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-4">${product.price.toFixed(2)} <span className="line-through">${product.originalPrice.toFixed(2)}</span></p>
          <p className="text-md text-gray-500 mt-2">{product.description}</p>
          <div className="mt-6">
            <span className="mr-4">Chọn Kích Cỡ:</span>
            <select className="border p-2" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white mt-6 p-3 rounded">THÊM VÀO GIỎ</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
