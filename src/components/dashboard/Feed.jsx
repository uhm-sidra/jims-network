import React, { useState } from 'react';
import PostCard from './PostCard.jsx';

function Feed({ posts, onAddPost, onToggleLike, searchQuery }) {
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('CampusUpdate');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Student Member (Sample)',
      role: 'BCA / B.Tech Student',
      authorType: 'student',
      avatar: 'SM',
      timeAgo: 'Just now',
      content: newContent.trim(),
      tags: [selectedTag],
      likes: 0,
      isLiked: false,
      commentsCount: 0,
    };

    onAddPost(newPost);
    setNewContent('');
  };

  // Filter posts by tab
  let filteredPosts = posts.filter((post) => {
    if (activeFilter === 'Alumni') return post.authorType === 'alumni';
    if (activeFilter === 'Official') return post.authorType === 'official';
    if (activeFilter === 'Students') return post.authorType === 'student';
    return true;
  });

  // Filter by global search query if present
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  return (
    <div className="feed-container">
      {/* Create Post Card */}
      <div className="card create-post-card">
        <div className="create-post-header">
          <div className="create-post-avatar">SM</div>
          <span className="create-post-prompt">Share an update with JIMS Network</span>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <textarea
            className="create-post-textarea"
            rows="3"
            placeholder="What's happening on campus? Share projects, interview experiences, questions, or opportunities..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <div className="create-post-footer">
            <div className="tag-select-group">
              <label htmlFor="post-tag-select" className="tag-select-label">Category:</label>
              <select
                id="post-tag-select"
                className="tag-select"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="CampusUpdate">Campus Update</option>
                <option value="PlacementPrep">Placement & Careers</option>
                <option value="Hackathon">Hackathons & Projects</option>
                <option value="AlumniAdvice">Alumni Guidance</option>
                <option value="GeneralQuery">General Discussion</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!newContent.trim()}
            >
              Post Update
            </button>
          </div>
        </form>
      </div>

      {/* Feed Filter Tabs */}
      <div className="feed-filter-tabs">
        {['All', 'Official', 'Alumni', 'Students'].map((filter) => (
          <button
            key={filter}
            className={`feed-filter-pill ${activeFilter === filter ? 'filter-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'All' ? 'All Updates' : filter}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="posts-stream">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onToggleLike={onToggleLike} />
          ))
        ) : (
          <div className="card empty-state-card">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No matching updates found</h3>
            <p className="empty-state-desc">
              Try adjusting your search query or switch filter tabs to view more campus posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;

