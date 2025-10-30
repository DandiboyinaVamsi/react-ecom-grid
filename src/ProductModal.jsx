import React from 'react';

export default function ProductModal({ product, onClose, onAdd }) {
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label="Close">✕</button>
        <div className='modal-grid'>
          <img src={product.img} alt={product.title} />
          <div>
            <h2>{product.title}</h2>
            <p className='price'>₹{product.price}</p>
            <p className='desc'>This is a demo product used for the React E‑commerce Grid. Replace with your actual product description.</p>
            <div style={{marginTop:12}}>
              <button onClick={() => { onAdd(product); onClose(); }}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
