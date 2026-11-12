import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import WelcomeBanner from './components/dashboard/WelcomeBanner.jsx';
import ProfileCompletion from './components/dashboard/ProfileCompletion.jsx';
import Feed from './components/dashboard/Feed.jsx';
import SuggestedConnections from './components/dashboard/SuggestedConnections.jsx';
import InternshipCard from './components/dashboard/InternshipCard.jsx';
import ProfileView from './components/dashboard/ProfileView.jsx';

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

  // Interactive Mock Data States
  const [posts, setPosts] = useState(initialPosts);
  const [people, setPeople] = useState(initialPeople);
  const [internships, setInternships] = useState(initialInternships);

  // Filter for Jobs & Internships tab
  const [internshipFilter, setInternshipFilter] = useState('ALL');

  // Interactive Handlers
  const handleToggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleToggleConnect = (personId) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            isConnected: !person.isConnected,
          };
        }
        return person;
      })
    );
  };

  const handleToggleApply = (internshipId) => {
    setInternships((prevList) =>
      prevList.map((item) => {
        if (item.id === internshipId) {
          return {
            ...item,
            isApplied: !item.isApplied,
          };
        }
        return item;
      })
    );
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
        />

        {/* Dynamic Main Body Content */}
        <main className="content-area">
          {/* 1. Dashboard View */}
          {activeTab === 'Dashboard' && (
            <div className="dashboard-view">
              <WelcomeBanner
                onNavigate={setActiveTab}
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
                            key={item.id}
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
                    <div key={internship.id} className="card internship-full-card">
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
