
import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    
    
    const handleStorageChange = (event) => {
      if (event.key === 'favorites' || (event.type === 'storage' && event.newValue)) {
        setFavorites(JSON.parse(event.newValue || localStorage.getItem('favorites')) || []);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    
    const event = new Event('storage');
    event.key = 'favorites';
    event.newValue = JSON.stringify(newFavorites);
    window.dispatchEvent(event);
  };

  
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    
    const event = new Event('storage');
    event.key = 'favorites';
    event.newValue = JSON.stringify(updatedFavorites);
    window.dispatchEvent(event);
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};
