import { useCart } from "../context/CartContext";

/**
 * Cart — Sliding sidebar panel showing all cart items.
 * Supports quantity adjustment, individual removal, clear all, and a checkout CTA.
 *
 * Props:
 *   isOpen  {boolean}  — controls whether the panel is visible.
 *   onClose {Function} — called when the close button is clicked.
 */
export default function Cart({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, clearCart, totalItems, totalPrice } =
    useCart();

  return (
    <aside
      className={`cart-sidebar${isOpen ? " cart-sidebar--open" : ""}`}
      aria-label="Shopping cart"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div className="cart-sidebar__header">
        <h2 className="cart-sidebar__title">
          Shopping Cart
          {totalItems > 0 && (
            <span className="cart-sidebar__count"> ({totalItems})</span>
          )}
        </h2>
        <button
          className="cart-sidebar__close"
          onClick={onClose}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="cart-sidebar__body">
        {cart.length === 0 ? (
          /* Empty state */
          <div className="cart-empty">
            <span className="cart-empty__icon" aria-hidden="true">🛒</span>
            <p className="cart-empty__text">Your cart is empty</p>
            <p className="cart-empty__sub">Add some products to get started!</p>
          </div>
        ) : (
          /* Item list */
          <ul className="cart-items" aria-label="Cart items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                {/* Item thumbnail */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item__image"
                />

                {/* Item details */}
                <div className="cart-item__details">
                  <p className="cart-item__title">{item.title}</p>
                  <p className="cart-item__unit-price">
                    ${item.price.toFixed(2)} each
                  </p>

                  {/* Quantity controls */}
                  <div
                    className="qty-controls qty-controls--sm"
                    role="group"
                    aria-label={`Quantity for ${item.title}`}
                  >
                    <button
                      className="qty-btn qty-btn--minus"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-display" aria-live="polite">
                      {item.qty}
                    </span>
                    <button
                      className="qty-btn qty-btn--plus"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="cart-item__right">
                  <p className="cart-item__subtotal">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer — only shown when cart has items */}
      {cart.length > 0 && (
        <div className="cart-sidebar__footer">
          {/* Order summary */}
          <div className="cart-summary">
            <div className="cart-summary__row">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <button
            className="btn-checkout"
            onClick={() => alert(`Order placed! Total: $${totalPrice.toFixed(2)}`)}
          >
            Proceed to Checkout
          </button>
          <button className="btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </aside>
  );
}
