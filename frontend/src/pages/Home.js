import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  const demoBookmarks = [
    {
      _id: '1',
      title: 'Designing Data-Intensive Apps',
      url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491933046/',
      category: 'Learning',
      isPublic: true,
      description: 'Martin Kleppmann - A comprehensive guide to distributed systems'
    },
    {
      _id: '2',
      title: 'The Pragmatic Engineer',
      url: 'https://newsletter.pragmaticengineer.com',
      category: 'Writing',
      isPublic: true,
      description: 'Newsletter exploring software engineering practices'
    },
    {
      _id: '3',
      title: 'Quiet by Susan Cain',
      url: 'https://www.amazon.com/Quiet-Power-Introverts-World-Talking/dp/0307352153',
      category: 'Reading',
      isPublic: false,
      description: 'Understanding the power of introverts'
    },
    {
      _id: '4',
      title: 'React Documentation',
      url: 'https://react.dev',
      category: 'Development',
      isPublic: true,
      description: 'Official React library documentation'
    },
    {
      _id: '5',
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      category: 'Development',
      isPublic: true,
      description: 'Utility-first CSS framework for rapid UI development'
    },
    {
      _id: '6',
      title: 'GitHub',
      url: 'https://github.com',
      category: 'Development',
      isPublic: true,
      description: 'Where the world builds software'
    },
    {
      _id: '7',
      title: 'Hacker News',
      url: 'https://news.ycombinator.com',
      category: 'Technology',
      isPublic: true,
      description: 'Social news aggregator focused on tech and startup news'
    },
    {
      _id: '8',
      title: 'Dev.to',
      url: 'https://dev.to',
      category: 'Technology',
      isPublic: true,
      description: 'Community of software developers sharing knowledge'
    },
    {
      _id: '9',
      title: 'CSS Tricks',
      url: 'https://css-tricks.com',
      category: 'Development',
      isPublic: true,
      description: 'Daily articles about CSS, HTML, JavaScript, and web design'
    },
    {
      _id: '10',
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      category: 'Development',
      isPublic: true,
      description: 'Resources for developers by Mozilla'
    },
    {
      _id: '11',
      title: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      category: 'Development',
      isPublic: true,
      description: 'Q&A community for programmers'
    },
    {
      _id: '12',
      title: 'Dribbble',
      url: 'https://dribbble.com',
      category: 'Design',
      isPublic: true,
      description: 'Community of designers sharing their work'
    }
  ];

  const categories = ['All', 'Development', 'Learning', 'Technology', 'Design', 'Writing', 'Reading'];

  const filteredBookmarks = useMemo(() => {
  return demoBookmarks.filter(bookmark => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || bookmark.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}, [searchTerm, selectedCategory, demoBookmarks]);

  const toggleBookmark = (id) => {
    const newBookmarked = new Set(bookmarkedIds);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarkedIds(newBookmarked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition duration-300">
              <span className="text-6xl">🔖</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The links worth <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">keeping</span> — organised.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Save, tag, and share. Keep some bookmarks private, publish the rest on a clean profile at /@your-handle. No clutter. No algorithms. Just your library.
            </p>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg">
                  Create your account
                </Link>
                <Link to="/login" className="border-2 border-gray-400 hover:border-blue-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition hover:bg-slate-800">
                  I have an account
                </Link>
              </div>
            )}

            <p className="text-gray-400 text-sm">Free to use. Email + password or one-tap Google sign-in. Welcome email included.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Private by default</h3>
              <p className="text-gray-400">Your bookmarks belong to you. Only you can read, edit, or delete them — enforced at the API.</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-bold text-white mb-2">Public when you want</h3>
              <p className="text-gray-400">Flip a switch to share a bookmark on your /@handle profile. No login needed to read.</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Tag and filter fast</h3>
              <p className="text-gray-400">Add tags as you save. Filter by category, search by title, find anything in two clicks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800 bg-opacity-50 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Explore Demo Bookmarks</h2>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookmarks by title or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-300 text-lg">No bookmarks found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map(bookmark => (
                <div 
                  key={bookmark._id} 
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-slate-900 flex-1 break-words">
                        {bookmark.title}
                      </h3>
                      <button
                        onClick={() => toggleBookmark(bookmark._id)}
                        className={`ml-2 flex-shrink-0 text-2xl transition transform hover:scale-110 ${
                          bookmarkedIds.has(bookmark._id) ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'
                        }`}
                        title={bookmarkedIds.has(bookmark._id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        {bookmarkedIds.has(bookmark._id) ? '⭐' : '☆'}
                      </button>
                    </div>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate block text-sm mb-3 font-medium"
                    >
                      {new URL(bookmark.url).hostname}
                    </a>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {bookmark.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {bookmark.category}
                      </span>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                        bookmark.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {bookmark.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-medium transition text-sm">
                        ✏️ Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded font-medium transition text-sm">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">Ready to start organizing your bookmarks?</p>
            {!user && (
              <Link to="/signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
                Sign up now
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
