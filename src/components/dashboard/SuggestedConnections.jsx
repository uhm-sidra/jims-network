import React, { useState } from 'react';

function SuggestedConnections({ people, onToggleConnect, searchQuery, isDirectoryMode = false }) {
  const [filterType, setFilterType] = useState('ALL');

  let filteredList = people.filter((person) => {
    if (filterType === 'ALUMNI') return person.type === 'Alumni';
    if (filterType === 'STUDENT') return person.type === 'Student';
    return true;
  });

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredList = filteredList.filter(
      (person) =>
        person.name.toLowerCase().includes(q) ||
        person.department.toLowerCase().includes(q) ||
        person.position.toLowerCase().includes(q) ||
        person.location.toLowerCase().includes(q)
    );
  }

  return (
    <div className={`card ${isDirectoryMode ? 'directory-card-full' : 'suggested-card'}`}>
      <div className="card-header">
        <div>
          <span className="card-eyebrow">
            {isDirectoryMode ? 'Campus Directory (Sample Data)' : 'Sample Connections'}
          </span>
          <h2 className="card-title">
            {isDirectoryMode ? 'Student & Alumni Directory' : 'Suggested Peers & Mentors'}
          </h2>
        </div>
        {isDirectoryMode && (
          <div className="directory-filters">
            {['ALL', 'STUDENT', 'ALUMNI'].map((type) => (
              <button
                key={type}
                className={`filter-btn-sm ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type === 'ALL' ? 'All Demo Members' : type === 'STUDENT' ? 'Students' : 'Alumni'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`people-list ${isDirectoryMode ? 'people-grid' : ''}`}>
        {filteredList.length > 0 ? (
          filteredList.map((person) => (
            <div key={person.id} className="person-row">
              <div className="person-avatar">{person.avatar}</div>
              <div className="person-info">
                <div className="person-name-row">
                  <span className="person-name">{person.name}</span>
                  <span className={`badge ${person.type === 'Alumni' ? 'badge-alumni' : 'badge-student'}`}>
                    {person.type} (Sample)
                  </span>
                </div>
                <div className="person-sub">{person.position}</div>
                <div className="person-dept">
                  {person.department} • {person.batch}
                </div>
                {person.mutualConnections && (
                  <div className="person-mutual">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    {person.mutualConnections} mutual connections (Demo)
                  </div>
                )}
              </div>
              <div className="person-action">
                <button
                  className={`btn-connect ${person.isConnected ? 'btn-connected' : 'btn-connect-primary'}`}
                  onClick={() => onToggleConnect(person.id)}
                  aria-label={person.isConnected ? `Disconnect from ${person.name}` : `Connect with ${person.name}`}
                >
                  {person.isConnected ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Connected
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-subtext">
            No matching profiles found for "{searchQuery}". Try a different keyword or reset filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestedConnections;
