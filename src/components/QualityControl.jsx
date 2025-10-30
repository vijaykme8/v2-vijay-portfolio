import React from 'react';
import './QualityControl.css';

const QualityControl = ({ currentQuality, onQualityChange, isEnhancing }) => {
  const qualityOptions = [
    { key: 'LOW', label: 'Fast', description: 'Quick loading, basic quality' },
    { key: 'MEDIUM', label: 'Balanced', description: 'Good balance of speed and quality' },
    { key: 'HIGH', label: 'Premium', description: 'Best quality, slower loading' }
  ];

  return (
    <div className="quality-control">
      <div className="quality-control-header">
        <h3>Animation Quality</h3>
        {isEnhancing && (
          <div className="enhancing-indicator">
            <div className="enhancing-dot"></div>
            <span>Enhancing...</span>
          </div>
        )}
      </div>
      
      <div className="quality-options">
        {qualityOptions.map((option) => (
          <button
            key={option.key}
            className={`quality-option ${currentQuality === option.key ? 'active' : ''}`}
            onClick={() => onQualityChange(option.key)}
            disabled={isEnhancing}
          >
            <div className="quality-option-header">
              <span className="quality-label">{option.label}</span>
              {currentQuality === option.key && (
                <div className="quality-check">✓</div>
              )}
            </div>
            <span className="quality-description">{option.description}</span>
          </button>
        ))}
      </div>
      
      <div className="quality-info">
        <p>
          <strong>Current:</strong> {qualityOptions.find(q => q.key === currentQuality)?.label} mode
        </p>
        <p className="quality-tip">
          💡 Tip: Start with "Balanced" for the best experience. Switch to "Premium" for maximum quality.
        </p>
      </div>
    </div>
  );
};

export default QualityControl; 