import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * CartContext
 * Provides global cart state and all cart operations to the component tree.
 * Cart is persisted to localStorage via the useLocalStorage hook.
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cart state: array of { ...product, qty }
  const [cart, setCart] = useLocalStorage("cart", []);

  /**
   * addToCart — adds a product or increments its quantity by 1.
   * @param {object} product - A product object from products.js
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Product already in cart — bump the quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // New product — append with qty 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /**
   * updateQty — increments or decrements an item's quantity.
   * Automatically removes the item if quantity would drop to 0.
   * @param {number} id    - Product id
   * @param {number} delta - +1 or -1
   */
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        const newQty = item.qty + delta;
        return newQty <= 0 ? [] : [{ ...item, qty: newQty }];
      })
    );
  };

  /**
   * removeItem — removes a product from the cart entirely.
   * @param {number} id - Product id
   */
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * clearCart — empties the cart completely.
   */
  const clearCart = () => setCart([]);

  // Derived values — recalculated only when cart changes
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  /**
   * getItemQty — returns the current quantity of a product in the cart (0 if not present).
   * @param {number} id - Product id
   */
  const getItemQty = (id) => cart.find((item) => item.id === id)?.qty ?? 0;

  // Memoize context value so consumers only re-render when cart changes
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
      getItemQty,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * useCart — convenience hook for consuming CartContext.
 * Throws if used outside of CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
