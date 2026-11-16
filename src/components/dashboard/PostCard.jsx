import React, { useState } from 'react';

function PostCard({ post, onToggleLike }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [copied, setCopied] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'Sample Student (You)',
      text: commentText.trim(),
      time: 'Just now',
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRoleBadgeClass = (authorType) => {
    switch (authorType) {
      case 'alumni':
        return 'badge-alumni';
      case 'official':
        return 'badge-official';
      default:
        return 'badge-student';
    }
  };

  return (
    <article className="card post-card">
      <div className="post-header">
        <div className="post-author-avatar">
          {post.avatar || 'JM'}
        </div>
        <div className="post-author-meta">
          <div className="post-author-row">
            <h3 className="post-author-name">{post.author}</h3>
            <span className={`badge ${getRoleBadgeClass(post.authorType)}`}>
              {post.authorType ? post.authorType.toUpperCase() : 'MEMBER'}
            </span>
          </div>
          <div className="post-author-subtitle">
            <span>{post.role}</span>
            <span className="meta-dot">•</span>
            <span className="post-time">{post.timeAgo}</span>
          </div>
        </div>
      </div>

      <div className="post-body">
        <p className="post-text">{post.content}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags-list">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="post-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button
          className={`post-action-btn ${post.isLiked ? 'action-liked' : ''}`}
          onClick={() => onToggleLike(post.id)}
          aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
          title={post.isLiked ? 'Unlike post' : 'Like post'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={post.isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{post.likes}</span>
        </button>

        <button
          className={`post-action-btn ${commentOpen ? 'action-active' : ''}`}
          onClick={() => setCommentOpen(!commentOpen)}
          aria-label="Toggle comments"
          title="Toggle comments"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>{comments.length}</span>
        </button>

        <button
          className="post-action-btn"
          onClick={handleShare}
          aria-label="Share post"
          title="Copy post link"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>{copied ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {commentOpen && (
        <div className="post-comments-section">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="btn btn-sm btn-primary">
              Reply
            </button>
          </form>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <div className="comment-author">{c.author}</div>
                  <div className="comment-text">{c.text}</div>
                </div>
              ))
            ) : (
              <div className="empty-comment-text">No comments yet. Be the first to share your thoughts!</div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default PostCard;
