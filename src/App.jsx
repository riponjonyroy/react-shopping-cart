import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";

/**
 * App — Root component.
 * Owns the cart sidebar open/close state and passes the toggle
 * down to Navbar (to open) and Cart (to close).
 */
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* Sticky top navigation bar */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Main content area */}
      <main className="main-content">
        <ProductGrid />
      </main>

      {/* Sliding cart sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Dark overlay — clicking it closes the cart */}
      {cartOpen && (
        <div
          className="overlay"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}
    </CartProvider>
  );
}
