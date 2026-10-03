import React from 'react';
import './HoverRevealCard.css';

/**
 * MineHub Hover-Reveal Capability Card
 * Compliant with MINEHUB_REFERENCE_HOVER_REVEAL_CARD_DESIGN_PROMPT.md
 * 
 * Supports:
 * - Default: Pale cyan gradient surface with top-right corner arrow
 * - Hover / Focus: Circular diagonal navy reveal, white typography
 * - Disabled: Muted, non-interactive, no reveal animation
 * - Loading: Skeleton placeholders preserving dimensions
 */
export const HoverRevealCard = ({
  title,
  description,
  eyebrow,
  icon,
  href,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  role,
  ariaLabel,
}) => {
  const CardTag = href && !disabled ? 'a' : 'div';
  
  const interactiveProps = disabled
    ? { 'aria-disabled': 'true', tabIndex: -1 }
    : href
    ? { href, role: role || 'link' }
    : onClick
    ? {
        onClick,
        role: role || 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        },
      }
    : { tabIndex: 0 };

  const computedAriaLabel = ariaLabel || (loading ? 'Loading card content' : `${title ? `${title}: ` : ''}${description || ''}`);

  if (loading) {
    return (
      <div className={`minehub-reveal-card is-loading ${className}`} aria-busy="true" aria-label={computedAriaLabel}>
        <div className="card-skeleton skeleton-eyebrow" />
        <div className="card-skeleton skeleton-title" />
        <div className="card-skeleton skeleton-desc" />
        <div className="card-skeleton skeleton-desc short" />
      </div>
    );
  }

  return (
    <CardTag
      className={`minehub-reveal-card ${disabled ? 'is-disabled' : ''} ${className}`}
      {...interactiveProps}
      aria-label={computedAriaLabel}
    >
      <div className="go-corner" aria-hidden="true">
        <div className="go-arrow">&rarr;</div>
      </div>

      {icon && <div className="card-top-icon" aria-hidden="true">{icon}</div>}

      {eyebrow && (
        <div className="card-eyebrow">
          <span>{eyebrow}</span>
        </div>
      )}

      <h4 className="card-title">{title}</h4>
      {description && <p className="card-desc">{description}</p>}
    </CardTag>
  );
};

/**
 * MineHub Stage Card Component
 * Compliant with Section 18 & 19 of MINEHUB_REFERENCE_HOVER_REVEAL_CARD_DESIGN_PROMPT.md
 * 
 * Features:
 * - White surface with thin semantic colored top edge
 * - Compact uppercase stage label
 * - Large dark blue title
 * - Concise body text
 * - Soft enterprise elevation
 */
export const MineHubStageCard = ({
  stage,
  title,
  description,
  accent = '#4CAF50',
  className = '',
  onClick,
}) => {
  const isInteractive = Boolean(onClick);
  return (
    <div
      className={`minehub-stage-card ${isInteractive ? 'is-interactive' : ''} ${className}`}
      style={{ '--stage-accent': accent }}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
    >
      {stage && <div className="stage-label">{stage}</div>}
      <h3 className="stage-title">{title}</h3>
      <p className="stage-desc">{description}</p>
    </div>
  );
};

// Alias per Section 38 of prompt
export const MineHubFeatureCard = HoverRevealCard;

export default HoverRevealCard;
