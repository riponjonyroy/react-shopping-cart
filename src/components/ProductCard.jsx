import { useCart } from "../context/CartContext";

/**
 * StarRating — renders filled/empty stars for a given numeric rating.
 * @param {number} rating - A number between 0 and 5.
 */
function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? "star--filled" : "star--empty"}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}

/**
 * ProductCard — Displays a single product with image, details, and cart controls.
 * If the product is already in the cart, quantity controls replace the "Add to Cart" button.
 *
 * Props:
 *   product {object} — A product from products.js
 */
export default function ProductCard({ product }) {
  const { addToCart, updateQty, getItemQty } = useCart();
  const qty = getItemQty(product.id);
  const inCart = qty > 0;

  return (
    <article className="product-card">
      {/* Category badge */}
      <span className="product-card__badge">{product.category}</span>

      {/* Product image */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      {/* Product details */}
      <div className="product-card__body">
        <h2 className="product-card__title">{product.title}</h2>
        <StarRating rating={product.rating} />
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>

      {/* Cart controls */}
      <div className="product-card__footer">
        {inCart ? (
          /* Quantity controls — shown when item is already in cart */
          <div className="qty-controls" role="group" aria-label="Quantity controls">
            <button
              className="qty-btn qty-btn--minus"
              onClick={() => updateQty(product.id, -1)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-display" aria-live="polite">
              {qty}
            </span>
            <button
              className="qty-btn qty-btn--plus"
              onClick={() => updateQty(product.id, 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          /* Add to Cart button — shown when item is not in cart */
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
