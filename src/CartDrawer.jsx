import React from 'react';

export default function CartDrawer({ open, onClose, cart = {}, updateQty, clearCart }) {
  const items = Object.values(cart);
  const total = items.reduce((s, x) => s + x.product.price * x.qty, 0);

  return (
    <div className={`cart-drawer ${open ? 'open' : ''}`} role="dialog" aria-modal={open}>
      <div className='drawer'>
        <div className='drawer-header'>
          <h3>Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart">Close</button>
        </div>
        <div className='drawer-body'>
          {!items.length && <div className='empty'>Cart is empty.</div>}
          {items.map(({ product, qty }) => (
            <div className='cart-item' key={product.id}>
              <img src={product.img} alt={product.title} />
              <div className='ci-body'>
                <div className='ci-title'>{product.title}</div>
                <div className='ci-meta'>₹{product.price} × {qty} = ₹{product.price * qty}</div>
                <div className='ci-actions'>
                  <button onClick={() => updateQty(product.id, qty - 1)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => updateQty(product.id, qty + 1)}>+</button>
                  <button onClick={() => updateQty(product.id, 0)} className='remove'>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='drawer-footer'>
          <div>Total: <strong>₹{total}</strong></div>
          <div>
            <button onClick={clearCart} className='clear'>Clear</button>
            <button className='checkout' disabled={!items.length}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
