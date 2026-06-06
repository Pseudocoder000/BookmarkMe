const Bookmark = require('../models/Bookmark');

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.userId });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBookmark = async (req, res) => {
  try {
    const { title, url, isPublic } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: 'Title and URL are required' });
    }

    const bookmark = new Bookmark({
      userId: req.user.userId,
      title,
      url,
      isPublic: isPublic || false
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, isPublic } = req.body;

    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    if (bookmark.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    bookmark.title = title || bookmark.title;
    bookmark.url = url || bookmark.url;
    bookmark.isPublic = isPublic !== undefined ? isPublic : bookmark.isPublic;

    await bookmark.save();
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    if (bookmark.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Bookmark.findByIdAndDelete(id);
    res.status(200).json({ message: 'Bookmark deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBookmarks, createBookmark, updateBookmark, deleteBookmark };
