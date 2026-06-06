import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkCard from '../components/BookmarkCard';
import { profileService } from '../services/api';
import Footer from '../components/Footer';

const PublicProfile = () => {
  const { handle } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPublicProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await profileService.getPublicProfile(handle);
      setBookmarks(response.data.bookmarks);
    } catch (err) {
      setError(err.response?.data?.message || 'Profile not found');
    } finally {
      setLoading(false);
    }
  }, [handle]);

  useEffect(() => {
    fetchPublicProfile();
  }, [handle, fetchPublicProfile]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-600">Loading profile...</div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">@{handle}</h1>
              <p className="text-gray-600">Public bookmarks</p>
            </div>

            {bookmarks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No public bookmarks yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map(bookmark => (
                  <BookmarkCard
                    key={bookmark._id}
                    bookmark={bookmark}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    canEdit={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicProfile;
