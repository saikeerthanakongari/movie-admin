import React, { useState } from 'react';
import { Trash2, Edit, Search } from 'lucide-react';

const initialMovies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', date: '2010-07-16', status: 'Active' },
  { id: 2, title: 'The Dark Knight', genre: 'Action', date: '2008-07-18', status: 'Active' },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', date: '2014-11-07', status: 'Active' },
];

const Movies = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">Movies List</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Release Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredMovies.map(movie => (
              <tr key={movie.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 font-medium dark:text-white">{movie.title}</td>
                <td className="p-4 dark:text-gray-300">{movie.genre}</td>
                <td className="p-4 dark:text-gray-300">{movie.date}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {movie.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(movie.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movies;