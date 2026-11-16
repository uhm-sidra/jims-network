import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import WelcomeBanner from './components/dashboard/WelcomeBanner.jsx';
import ProfileCompletion from './components/dashboard/ProfileCompletion.jsx';
import Feed from './components/dashboard/Feed.jsx';
import SuggestedConnections from './components/dashboard/SuggestedConnections.jsx';
import InternshipCard from './components/dashboard/InternshipCard.jsx';
import ProfileView from './components/dashboard/ProfileView.jsx';

import { api } from './services/api.js';
import {
  initialPosts,
  initialPeople,
  initialInternships,
} from './data/mockData.js';

function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Data States (Loaded from API with Graceful Mock Fallback)
  const [posts, setPosts] = useState(initialPosts);
  const [people, setPeople] = useState(initialPeople);
  const [internships, setInternships] = useState(initialInternships);
  const [apiStatus, setApiStatus] = useState('connecting'); // 'connecting' | 'online' | 'prototype'

  // Filter for Jobs & Internships tab
  const [internshipFilter, setInternshipFilter] = useState('ALL');

  // Load live data from REST API if server is up, else keep rich prototype state
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const isHealthy = await api.checkHealth();
        if (!isMounted) return;

        if (isHealthy) {
          setApiStatus('online');
          // Fetch live data in parallel
          const [livePosts, livePeople, liveInternships] = await Promise.all([
            api.getPosts(),
            api.getUsers(),
            api.getInternships(),
          ]);

          if (isMounted) {
            if (Array.isArray(livePosts) && livePosts.length > 0) {
              setPosts(livePosts);
            }
            if (Array.isArray(livePeople) && livePeople.length > 0) {
              setPeople(livePeople);
            }
            if (Array.isArray(liveInternships) && liveInternships.length > 0) {
              setInternships(liveInternships);
            }
          }
        } else {
          setApiStatus('prototype');
        }
      } catch (err) {
        console.info('API unavailable, running in Phase 1 standalone prototype mode:', err);
        if (isMounted) setApiStatus('prototype');
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Interactive Handlers (Optimistic UI + API Sync)
  const handleToggleLike = async (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        const match = (post._id && post._id === postId) || (post.id && post.id === postId);
        if (match) {
          const isLiked = !post.isLiked;
          const currentLikes = post.likesCount !== undefined ? post.likesCount : (post.likes || 0);
          return {
            ...post,
            isLiked,
            likes: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
            likesCount: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
          };
        }
        return post;
      })
    );

    if (apiStatus === 'online') {
      try {
        await api.toggleLike(postId);
      } catch (e) {
        console.warn('Like toggle sync error:', e);
      }
    }
  };

  const handleAddPost = async (newPost) => {
    // Add locally for instant UI update
    setPosts([newPost, ...posts]);

    if (apiStatus === 'online') {
      try {
        const created = await api.createPost({
          author: newPost.author,
          authorType: newPost.authorType,
          role: newPost.role,
          avatar: newPost.avatar,
          content: newPost.content,
          tags: newPost.tags,
        });
        if (created && created._id) {
          // Replace temporary id with DB id
          setPosts((prev) =>
            prev.map((p) => (p.id === newPost.id ? { ...created, isLiked: false } : p))
          );
        }
      } catch (e) {
        console.warn('Post creation sync error:', e);
      }
    }
  };

  const handleToggleConnect = async (personId) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) => {
        const match = (person._id && person._id === personId) || (person.id && person.id === personId);
        if (match) {
          return {
            ...person,
            isConnected: !person.isConnected,
          };
        }
        return person;
      })
    );

    if (apiStatus === 'online') {
      try {
        await api.toggleConnect(personId);
      } catch (e) {
        console.warn('Connect toggle sync error:', e);
      }
    }
  };

  const handleToggleApply = async (internshipId) => {
    setInternships((prevList) =>
      prevList.map((item) => {
        const match = (item._id && item._id === internshipId) || (item.id && item.id === internshipId);
        if (match) {
          return {
            ...item,
            isApplied: !item.isApplied,
          };
        }
        return item;
      })
    );

    if (apiStatus === 'online') {
      try {
        await api.toggleApplyInternship(internshipId, 'student@jimsindia.org');
      } catch (e) {
        console.warn('Apply toggle sync error:', e);
      }
    }
  };

  // Filtered internships for the dedicated tab
  let filteredInternships = internships.filter((item) => {
    if (internshipFilter === 'REMOTE') return item.location.toLowerCase().includes('remote');
    if (internshipFilter === 'ON_SITE') return !item.location.toLowerCase().includes('remote');
    return true;
  });

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredInternships = filteredInternships.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Dashboard sidebar internships matching search
  const dashboardInternships = internships.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Calculate dynamic demo stats
  const connectedCount = people.filter((p) => p.isConnected).length;
  const totalDemoConnections = 38 + connectedCount;

  return (
    <div className="app-layout">
      {/* Navy-Blue Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main App Container */}
      <div className="main-wrapper">
        {/* Top Search & Actions Navbar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          activeTab={activeTab}
          onNavigate={setActiveTab}
          apiStatus={apiStatus}
        />

        {/* Dynamic Main Body Content */}
        <main className="content-area">
          {/* 1. Dashboard View */}
          {activeTab === 'Dashboard' && (
            <div className="dashboard-view">
              <WelcomeBanner
                onNavigate={setActiveTab}
                apiStatus={apiStatus}
                stats={{
                  totalMembers: people.length,
                  totalInternships: internships.length,
                  totalConnections: totalDemoConnections,
                }}
              />

              <div className="dashboard-grid">
                {/* Center / Feed Column */}
                <div className="dashboard-main-col">
                  <ProfileCompletion onNavigate={setActiveTab} />
                  <Feed
                    posts={posts}
                    onAddPost={handleAddPost}
                    onToggleLike={handleToggleLike}
                    searchQuery={searchQuery}
                  />
                </div>

                {/* Right Widget Column */}
                <aside className="dashboard-side-col">
                  <SuggestedConnections
                    people={people.slice(0, 4)}
                    onToggleConnect={handleToggleConnect}
                    searchQuery={searchQuery}
                    isDirectoryMode={false}
                  />

                  <div className="card side-internships-card">
                    <div className="card-header">
                      <div>
                        <span className="card-eyebrow">Sample Openings</span>
                        <h2 className="card-title">Featured Internships</h2>
                      </div>
                      <button
                        className="btn-link"
                        onClick={() => setActiveTab('Jobs & Internships')}
                      >
                        View All ({internships.length})
                      </button>
                    </div>

                    <div className="side-internships-list">
                      {dashboardInternships.length > 0 ? (
                        dashboardInternships.slice(0, 2).map((item) => (
                          <InternshipCard
                            key={item._id || item.id}
                            internship={item}
                            onToggleApply={handleToggleApply}
                          />
                        ))
                      ) : (
                        <div className="empty-subtext">
                          No internships match "{searchQuery}".
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {/* 2. Community Feed View */}
          {activeTab === 'Community Feed' && (
            <div className="single-view-container">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Community Feed</h1>
                  <p className="view-subtitle">
                    Sample real-time campus discussions, alumni advice, and placement updates (Demo Posts).
                  </p>
                </div>
              </div>

              <div className="feed-centered-col">
                <Feed
                  posts={posts}
                  onAddPost={handleAddPost}
                  onToggleLike={handleToggleLike}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          )}

          {/* 3. Directory View */}
          {activeTab === 'Directory' && (
            <div className="single-view-container">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Student & Alumni Directory</h1>
                  <p className="view-subtitle">
                    Sample roster of current students and alumni profiles across departments (Demonstration Data).
                  </p>
                </div>
              </div>

              <SuggestedConnections
                people={people}
                onToggleConnect={handleToggleConnect}
                searchQuery={searchQuery}
                isDirectoryMode={true}
              />
            </div>
          )}

          {/* 4. Jobs & Internships View */}
          {activeTab === 'Jobs & Internships' && (
            <div className="single-view-container">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Jobs & Campus Internships</h1>
                  <p className="view-subtitle">
                    Sample internship openings and student trainee positions for demonstration (Demo Data).
                  </p>
                </div>
                <div className="internship-filters-row">
                  {['ALL', 'REMOTE', 'ON_SITE'].map((f) => (
                    <button
                      key={f}
                      className={`filter-btn-sm ${internshipFilter === f ? 'active' : ''}`}
                      onClick={() => setInternshipFilter(f)}
                    >
                      {f === 'ALL' ? 'All Roles' : f === 'REMOTE' ? 'Remote Only' : 'On-Site / Hybrid'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="internships-grid-full">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <div key={internship._id || internship.id} className="card internship-full-card">
                      <InternshipCard
                        internship={internship}
                        onToggleApply={handleToggleApply}
                      />
                    </div>
                  ))
                ) : (
                  <div className="card empty-state-card">
                    <h3 className="empty-state-title">No internships found</h3>
                    <p className="empty-state-desc">
                      Try resetting your filter or searching for another keyword.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. My Profile View */}
          {activeTab === 'My Profile' && <ProfileView />}
        </main>
      </div>
    </div>
  );
}

export default App;
