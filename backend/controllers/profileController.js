const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

const getPublicProfile = async (req, res) => {
  try {
    const { handle } = req.params;

    const user = await User.findOne({ handle });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookmarks = await Bookmark.find({ userId: user._id, isPublic: true });

    res.status(200).json({
      handle: user.handle,
      email: user.email,
      bookmarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const claimHandle = async (req, res) => {
  try {
    const { handle } = req.body;

    if (!handle) {
      return res.status(400).json({ message: 'Handle is required' });
    }

    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      return res.status(400).json({ message: 'Handle already taken' });
    }

    const user = await User.findById(req.user.userId);
    if (user.handle) {
      return res.status(400).json({ message: 'Handle already claimed' });
    }

    user.handle = handle;
    await user.save();

    res.status(200).json({ message: 'Handle claimed successfully', handle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPublicProfile, claimHandle };
