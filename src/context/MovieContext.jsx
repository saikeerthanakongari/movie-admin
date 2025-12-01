import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // 1. Initial Dummy Data
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', genre: 'Sci-Fi', date: '2010-07-16', status: 'Active' },
    { id: 2, title: 'The Dark Knight', genre: 'Action', date: '2008-07-18', status: 'Active' },
    { id: 3, title: 'Interstellar', genre: 'Sci-Fi', date: '2014-11-07', status: 'Active' },
    { id: 4, title: 'Parasite', genre: 'Drama', date: '2019-05-30', status: 'Active' },
    { id: 5, title: 'Avengers: Endgame', genre: 'Action', date: '2019-04-26', status: 'Inactive' },
    { id: 6, title: 'Joker', genre: 'Drama', date: '2019-10-04', status: 'Active' },
  ]);

  const [notification, setNotification] = useState(null);

  // 2. Show Notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // 3. Add Movie Function
  const addMovie = (movie) => {
    setMovies([...movies, { ...movie, id: Date.now() }]);
    showNotification(`Movie "${movie.title}" added successfully!`);
  };

  // 4. Edit Movie Function
  const updateMovie = (id, updatedMovie) => {
    setMovies(movies.map(m => (m.id === id ? { ...updatedMovie, id } : m)));
    showNotification(`Movie "${updatedMovie.title}" updated successfully!`);
  };

  // 5. Delete Movie Function
  const deleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id));
    showNotification('Movie deleted successfully.', 'error');
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, updateMovie, deleteMovie, notification }}>
      {children}
      {/* Global Notification Banner */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } transition-all transform translate-y-0`}>
          {notification.message}
        </div>
      )}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);