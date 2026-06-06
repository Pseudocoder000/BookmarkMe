import React, { useState, useEffect } from 'react';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkCard from '../components/BookmarkCard';
import { bookmarkService, profileService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState(user?.handle || '');
  const [newHandle, setNewHandle] = useState('');
  const [showHandleForm, setShowHandleForm] = useState(!user?.handle);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await bookmarkService.getBookmarks();
      setBookmarks(response.data);
    } catch (err) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateBookmark = async (data) => {
    try {
      if (editingBookmark) {
        await bookmarkService.updateBookmark(editingBookmark._id, data.title, data.url, data.isPublic);
        setEditingBookmark(null);
      } else {
        await bookmarkService.createBookmark(data.title, data.url, data.isPublic);
      }
      fetchBookmarks();
    } catch (err) {
      setError('Failed to save bookmark');
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await bookmarkService.deleteBookmark(id);
        fetchBookmarks();
      } catch (err) {
        setError('Failed to delete bookmark');
      }
    }
  };

  const handleClaimHandle = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await profileService.claimHandle(newHandle);
      setHandle(newHandle);
      setNewHandle('');
      setShowHandleForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to claim handle');
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Your Dashboard</h1>
          <p className="text-gray-600">Manage and organize your bookmarks</p>
        </div>

        {handle && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900">
              Your public profile: <span className="font-bold">/@{handle}</span>
              {!showHandleForm && (
                <button
                  onClick={() => setShowHandleForm(true)}
                  className="ml-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Share
                </button>
              )}
            </p>
          </div>
        )}

        {showHandleForm && !handle && (
          <form onSubmit={handleClaimHandle} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Claim your @handle</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value.toLowerCase())}
                placeholder="your-unique-handle"
                className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition"
              >
                Claim
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <BookmarkForm
          onSubmit={handleAddOrUpdateBookmark}
          initialData={editingBookmark}
          onCancel={editingBookmark ? () => setEditingBookmark(null) : null}
        />

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading bookmarks...</div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg">No bookmarks yet. Start by adding one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map(bookmark => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={setEditingBookmark}
                onDelete={handleDeleteBookmark}
                canEdit={true}
              />
            ))}
          </div>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
