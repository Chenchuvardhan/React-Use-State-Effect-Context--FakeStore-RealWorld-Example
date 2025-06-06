import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SearchCategoryContext = createContext(null);

// MainComponent: Displays products
export const MainComponent = ({ handleAddCart, cart }) => {
  const categoryName = useContext(SearchCategoryContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryName || categoryName.trim() === "") {
      setProducts([]);
      return;
    }

    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryName]);

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <div>
      <p className="container fw-bold fs-4">Results:</p>
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-danger">No products found.</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          {products.map((p) => (
            <div className="card mb-4" key={p.id} style={{ width: "270px" }}>
              <div className="card-header">
                <img
                  src={p.image}
                  style={{ height: "160px", width: "250px" }}
                  loading="lazy"
                  alt="product"
                />
              </div>
              <div className="card-body">{p.title.substring(0, 30)}...</div>
              <div className="card-footer">
                <span className="fw-bold">${p.price.toFixed(2)}</span>
                <div className="mt-2">
                  <button
                    className="btn btn-warning bi bi-cart2 mx-2"
                    onClick={() => handleAddCart(p)}
                    disabled={isInCart(p.id)}
                  >
                    {isInCart(p.id) ? "Added" : "Cart"}
                  </button>
                  <button className="btn btn-success">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ProductSearch: Main wrapper with search, cart, and layout
export const ProductSearch = () => {
  const [categoryName, setCategoryName] = useState("electronics");
  const [cartProducts, setCartProducts] = useState([]);
  const [clickCartItems, setClickCartItems] = useState(false);

  const handleSearchChange = (e) => setCategoryName(e.target.value);

  const handleSearchClick = () => {
    if (categoryName.trim() === "") {
      alert("Please enter a category name.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleAddToCart = (p) => {
    if (!cartProducts.find((item) => item.id === p.id)) {
      const updatedCart = [...cartProducts, p];
      setCartProducts(updatedCart);
    }
  };

  const removeCartItems = (p) => {
    const updated = cartProducts.filter((prod) => prod.id !== p.id);
    setCartProducts(updated);
  };

  const toggleCartVisibility = () => {
    setClickCartItems(!clickCartItems);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-warning d-flex justify-content-between p-3">
        <div className="fw-bold fs-5">
          Big Basket <span className="bi bi-basket"></span>
        </div>
        <div className="container-fluid text-center input-group w-50">
          <input
            type="text"
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="form-control mx-2"
            placeholder="Search by category..."
            style={{ height: "35px" }}
          />
          <button
            className="btn btn-dark bi bi-search"
            onClick={handleSearchClick}
          ></button>
        </div>
        <div className="d-flex">
          <button className="btn bi bi-heart mx-2"></button>
          <button className="btn bi bi-person-fill mx-2"></button>
          <button
            className="btn bi bi-cart position-relative me-3"
            onClick={toggleCartVisibility}
          >
            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {cartProducts.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <main className="row">
        {/* Product Listing */}
        <div className={`col-${clickCartItems ? "9" : "12"}`}>
          <SearchCategoryContext.Provider value={categoryName}>
            <MainComponent handleAddCart={handleAddToCart} cart={cartProducts} />
          </SearchCategoryContext.Provider>
        </div>

        {/* Cart Items */}
        {clickCartItems && (
          <div className="col-3 border-start">
            <div className="fw-bold fs-5 my-2">Cart Items</div>
            {cartProducts.length === 0 ? (
              <p className="text-muted">Cart is empty.</p>
            ) : (
              cartProducts.map((p) => (
                <div className="card mb-3" key={p.id}>
                  <div className="card-header">
                    <img
                      src={p.image}
                      height="170px"
                      className="img-fluid"
                      alt="cart item"
                    />
                  </div>
                  <div className="card-body fw-bold">${p.price.toFixed(2)}</div>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger bi bi-trash mx-2"
                      onClick={() => removeCartItems(p)}
                    >
                      Remove
                    </button>
                    <button className="btn btn-success">Purchase</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};
