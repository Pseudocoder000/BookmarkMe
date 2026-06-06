import React, { useState, useEffect } from 'react';

const BookmarkForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setIsPublic(initialData.isPublic);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, url, isPublic });
    setTitle('');
    setUrl('');
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-slate-900">
        {initialData ? 'Edit Bookmark' : 'Add New Bookmark'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bookmark title"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label className="ml-2 text-slate-700 font-medium">Make this bookmark public</label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition"
        >
          {initialData ? 'Update' : 'Add'} Bookmark
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookmarkForm;
