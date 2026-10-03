import { useState, useMemo } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

/**
 * Derive a sorted, deduplicated list of categories from the product data.
 * "All" is prepended as the default filter option.
 */
const ALL = "All";
const categories = [
  ALL,
  ...Array.from(new Set(products.map((p) => p.category))).sort(),
];

/**
 * ProductGrid — Renders a filterable grid of product cards.
 * Users can filter by category using the tab strip at the top.
 */
export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState(ALL);

  // Only re-filter when activeCategory changes
  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="product-section">
      {/* Page heading */}
      <h1 className="product-section__heading">Our Products</h1>

      {/* Category filter tabs */}
      <div className="filter-tabs" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`filter-tab${activeCategory === cat ? " filter-tab--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
