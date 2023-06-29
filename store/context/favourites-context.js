import { createContext, useState } from "react";

export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

function FavouritesContextProvider({ children }) {
  const [favouriteBooksIds, setFavouriteBooksIds] = useState([]);

  function addFavourite(id) {
    setFavouriteBooksIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavourite(id) {
    setFavouriteBooksIds((currentFavIds) =>
      currentFavIds.filter((bookId) => bookId !== id)
    );
  }

  const value = {
    ids: favouriteBooksIds,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
