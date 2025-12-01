import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MovieForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    date: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  // Reset or Load data when form opens
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', genre: '', date: '', status: 'Active' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {initialData ? 'Edit Movie' : 'Add New Movie'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Genre</label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.genre}
              onChange={e => setFormData({ ...formData, genre: e.target.value })}
            >
              <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
            </select>
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Release Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Status</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 dark:text-white">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                /> Active
              </label>
              <label className="flex items-center gap-2 dark:text-white">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                /> Inactive
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Update Movie' : 'Add Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;