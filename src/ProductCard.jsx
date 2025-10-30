import React, { useState } from 'react';
import ProductModal from './ProductModal.jsx';

export default function ProductCard({ product, onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='card'>
      <div className='image-wrap' onClick={() => setOpen(true)} role="button" tabIndex={0}>
        <img src={product.img} alt={product.title} />
      </div>
      <div className='card-body'>
        <h3>{product.title}</h3>
        <div className='meta'>
          <span className='price'>₹{product.price}</span>
          <button className='add' onClick={() => onAdd(product)}>Add</button>
        </div>
      </div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} onAdd={onAdd} />}
    </div>
  );
}
