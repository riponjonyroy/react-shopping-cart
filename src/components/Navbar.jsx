import { useCart } from "../context/CartContext";

/**
 * Navbar — Top navigation bar.
 * Displays the brand name and a cart button with a live item-count badge.
 *
 * Props:
 *   onCartClick {Function} — called when the cart icon button is clicked.
 */
export default function Navbar({ onCartClick }) {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      {/* Brand */}
      <div className="navbar__brand">
        <span className="navbar__logo" aria-hidden="true">🛒</span>
        <span className="navbar__title">ShopCart</span>
      </div>

      {/* Cart toggle button */}
      <button
        className="navbar__cart-btn"
        onClick={onCartClick}
        aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
      >
        {/* SVG cart icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* Badge — only shown when there are items */}
        {totalItems > 0 && (
          <span className="navbar__badge" aria-hidden="true">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>
    </header>
  );
}
