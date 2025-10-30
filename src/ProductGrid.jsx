import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products = [], onAdd }) {
  if (!products.length) return <div className="no-results">No products found.</div>;

  return (
    <div className="grid-wrap">
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </div>
    </div>
  );
}
