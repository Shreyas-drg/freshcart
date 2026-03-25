const RainfrostLogo = () => {
  return (
    <svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Filters for glowing effects */}
        <filter id="rainforest-glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="leaf1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#1b5e20', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#00c853', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="leaf2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#00b847', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#76ff03', stopOpacity: 0.8}} />
        </linearGradient>
        <linearGradient id="leaf3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#2e7d32', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#4caf50', stopOpacity: 1}} />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="rgba(76, 175, 80, 0.08)" stroke="#4caf50" strokeWidth="1" opacity="0.3"/>

      {/* Back trees (darker, larger) */}
      {/* Tree 1 - back left */}
      <g opacity="0.6">
        <ellipse cx="60" cy="85" rx="22" ry="35" fill="#1b5e20"/>
        <ellipse cx="50" cy="75" rx="16" ry="28" fill="#2e7d32"/>
        <ellipse cx="70" cy="80" rx="18" ry="32" fill="#1b5e20"/>
      </g>

      {/* Tree 2 - back right */}
      <g opacity="0.65">
        <ellipse cx="140" cy="90" rx="24" ry="38" fill="#1b5e20"/>
        <ellipse cx="155" cy="75" rx="18" ry="30" fill="#2e7d32"/>
        <ellipse cx="125" cy="85" rx="20" ry="35" fill="#1b5e20"/>
      </g>

      {/* Midground trees */}
      {/* Tree 3 - center back */}
      <g opacity="0.8">
        <ellipse cx="100" cy="70" rx="28" ry="42" fill="#00b847"/>
        <ellipse cx="85" cy="60" rx="20" ry="32" fill="#2e7d32"/>
        <ellipse cx="115" cy="65" rx="22" ry="36" fill="#1b5e20"/>
      </g>

      {/* Front layer - Detailed leaves */}
      {/* Large front left leaf */}
      <g filter="url(#rainforest-glow)" transform="translate(50, 110) rotate(-20)">
        <ellipse cx="0" cy="0" rx="19" ry="32" fill="url(#leaf1-gradient)"/>
        <path d="M 0 -32 Q -8 -10 0 0 Q 8 -10 0 -32" fill="#1b5e20" opacity="0.4"/>
      </g>

      {/* Large front right leaf */}
      <g filter="url(#rainforest-glow)" transform="translate(150, 115) rotate(25)">
        <ellipse cx="0" cy="0" rx="20" ry="34" fill="url(#leaf2-gradient)"/>
        <path d="M 0 -34 Q -9 -12 0 0 Q 9 -12 0 -34" fill="#2e7d32" opacity="0.4"/>
      </g>

      {/* Center front leaf */}
      <g filter="url(#rainforest-glow)" transform="translate(100, 135) rotate(-5)">
        <ellipse cx="0" cy="0" rx="22" ry="36" fill="url(#leaf3-gradient)"/>
        <path d="M 0 -36 Q -10 -14 0 0 Q 10 -14 0 -36" fill="#1b5e20" opacity="0.5"/>
      </g>

      {/* Small accent leaves */}
      <g opacity="0.9">
        <ellipse cx="75" cy="50" rx="8" ry="14" fill="#00c853" filter="url(#rainforest-glow)" transform="rotate(-30 75 50)"/>
        <ellipse cx="125" cy="55" rx="9" ry="15" fill="#76ff03" filter="url(#rainforest-glow)" transform="rotate(35 125 55)"/>
        <ellipse cx="100" cy="45" rx="8" ry="13" fill="#2e7d32" filter="url(#rainforest-glow)" transform="rotate(10 100 45)"/>
      </g>

      {/* Water droplets (to represent rain) */}
      <g opacity="0.8" filter="url(#rainforest-glow)">
        <circle cx="70" cy="130" r="3" fill="#42a5f5"/>
        <circle cx="130" cy="125" r="2.5" fill="#42a5f5" opacity="0.7"/>
        <circle cx="100" cy="155" r="2" fill="#42a5f5" opacity="0.6"/>
      </g>

      {/* Glowing accent - firefly effect */}
      <g filter="url(#rainforest-glow)">
        <circle cx="110" cy="90" r="3" fill="#b9f6ca">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
};

export default RainfrostLogo;
