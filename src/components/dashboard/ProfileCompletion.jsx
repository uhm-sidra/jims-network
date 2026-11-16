import React, { useState } from 'react';
import { profileSteps } from '../../data/mockData.js';

function ProfileCompletion({ onNavigate }) {
  const [steps, setSteps] = useState(profileSteps);

  const toggleStep = (stepId) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="card profile-completion-card">
      <div className="card-header">
        <div className="card-header-text">
          <span className="card-eyebrow">Sample Readiness Tracker (Demo Data)</span>
          <h2 className="card-title">Profile Completion: {percentage}%</h2>
        </div>
        <div className="completion-badge">{completedCount} of {steps.length} Steps</div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>

      <p className="card-subtitle">
        Interactive checklist demo: Click any step to test the completion tracker.
      </p>

      <ul className="completion-steps-list">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`step-item ${step.completed ? 'step-completed' : 'step-pending'} interactive-step`}
            onClick={() => toggleStep(step.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleStep(step.id);
              }
            }}
          >
            <span className="step-checkbox">
              {step.completed ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="step-bullet" />
              )}
            </span>
            <span className="step-label">{step.label}</span>
          </li>
        ))}
      </ul>

      <div className="card-footer">
        <button className="btn btn-outline-primary" onClick={() => onNavigate('My Profile')}>
          View Sample Profile Details
        </button>
      </div>
    </div>
  );
}

export default ProfileCompletion;
