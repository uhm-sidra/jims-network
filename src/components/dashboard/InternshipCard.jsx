import React from 'react';

function InternshipCard({ internship, onToggleApply }) {
  return (
    <div className="internship-item">
      <div className="internship-top">
        <div className="company-logo-placeholder">
          {internship.company ? internship.company.slice(0, 2).toUpperCase() : 'CO'}
        </div>
        <div className="internship-meta">
          <h3 className="internship-title">{internship.title}</h3>
          <div className="internship-company">{internship.company}</div>
        </div>
      </div>

      <div className="internship-details-row">
        <span className="internship-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {internship.location}
        </span>
        <span className="internship-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          {internship.type}
        </span>
      </div>

      <div className="internship-stipend-deadline">
        <div className="stipend-text">
          <strong>Stipend:</strong> {internship.stipend}
        </div>
        <div className="deadline-text">
          <strong>Deadline:</strong> {internship.deadline}
        </div>
      </div>

      {internship.description && (
        <p className="internship-description">{internship.description}</p>
      )}

      {internship.skills && internship.skills.length > 0 && (
        <div className="internship-skills">
          {internship.skills.map((skill, idx) => (
            <span key={idx} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="internship-action">
        <button
          className={`btn-apply ${internship.isApplied ? 'btn-applied' : 'btn-apply-primary'}`}
          onClick={() => onToggleApply(internship.id)}
        >
          {internship.isApplied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Applied
            </>
          ) : (
            'Apply Now'
          )}
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;

