import React, { useState, useEffect } from 'react';
import productsData from './data/products.js';
import ProductGrid from './ProductGrid.jsx';
import CartDrawer from './CartDrawer.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('react-ecom-cart');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('react-ecom-cart', JSON.stringify(cart));
  }, [cart]);

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filtered = productsData
    .filter(p => (category === 'All' ? true : p.category === category))
    .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    .filter(p => p.price <= maxPrice)
    .sort((a,b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return b.featured - a.featured;
    });

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const copy = { ...prev };
      const id = product.id;
      copy[id] = copy[id] ? { ...copy[id], qty: copy[id].qty + qty } : { product, qty };
      return copy;
    });
    setCartOpen(true);
  };

  const updateQty = (id, qty) => {
    setCart(prev => {
      const copy = { ...prev };
      if (!copy[id]) return copy;
      if (qty <= 0) delete copy[id];
      else copy[id] = { ...copy[id], qty };
      return copy;
    });
  };

  const clearCart = () => setCart({});

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">ShopGrid</h1>
        <div className="search-wrapper">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" />
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
          Cart ({Object.keys(cart).length})
        </button>
      </header>

      <main className="container">
        <aside className="filters">
          <h2>Filters</h2>
          <div className="filter-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Max price: ₹{maxPrice}</label>
            <input type="range" min="100" max="1000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </div>
          <div className="filter-group">
            <label>Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
          <div style={{marginTop:12}}>
            <button onClick={() => { setCategory('All'); setMaxPrice(1000); setSort('featured'); setQuery(''); }}>Reset</button>
          </div>
        </aside>

        <section className="products-section">
          <ProductGrid products={filtered} onAdd={addToCart} />
        </section>
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={updateQty} clearCart={clearCart} />

      <footer className="footer">Made with ♥ — React E‑commerce Grid Demo</footer>
    </div>
  );
}
