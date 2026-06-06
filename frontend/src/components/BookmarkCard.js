import React from 'react';

const BookmarkCard = ({ bookmark, onEdit, onDelete, canEdit = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-slate-900 break-words flex-1">
          {bookmark.title}
        </h3>
        {canEdit && (
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => onEdit(bookmark)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(bookmark._id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 truncate block text-sm mb-2"
      >
        {bookmark.url}
      </a>
      {bookmark.isPublic !== undefined && (
        <span className={`inline-block text-xs px-2 py-1 rounded ${
          bookmark.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {bookmark.isPublic ? 'Public' : 'Private'}
        </span>
      )}
    </div>
  );
};

export default BookmarkCard;
