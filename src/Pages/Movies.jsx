import React, { useState } from 'react';
import { Trash2, Edit, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovies } from '../context/MovieContext'; // Import Context
import MovieForm from '../components/MovieForm';    // Import Form

const Movies = () => {
  const { movies, deleteMovie, addMovie, updateMovie } = useMovies();
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  // Handlers
  const handleAddClick = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, formData);
    } else {
      addMovie(formData);
    }
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure?')) deleteMovie(id);
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold dark:text-white">Movies List</h2>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add Movie
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border dark:border-gray-700">
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
              {currentItems.length > 0 ? (
                currentItems.map(movie => (
                  <tr key={movie.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-4 font-medium dark:text-white">{movie.title}</td>
                    <td className="p-4 dark:text-gray-300">{movie.genre}</td>
                    <td className="p-4 dark:text-gray-300">{movie.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        movie.status === 'Active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {movie.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => handleEditClick(movie)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(movie.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No movies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMovies.length)} of {filteredMovies.length} entries
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft size={18} className="dark:text-white" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight size={18} className="dark:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <MovieForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialData={editingMovie}
      />
    </div>
  );
};

export default Movies;