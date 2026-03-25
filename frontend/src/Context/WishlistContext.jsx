import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p._id === product._id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((p) => p._id !== id));

  const isWishlisted = (id) => wishlist.some((p) => p._id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);