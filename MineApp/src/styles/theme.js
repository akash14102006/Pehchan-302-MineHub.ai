// Pragati Mitra 100% Faithful Token Registry for MineHub.ai
export const theme = {
  colors: {
    primary: '#164863',        // Deep Navy Anchor
    primaryHover: '#1f6f98',
    primaryDark: '#0e3144',
    secondary: '#D0E8F0',      // Pale Powder Blue Context & Active states
    secondaryDark: '#a8d2e2',
    canvas: '#f4f4f4',         // Application background (Light Gray canvas)
    surface: '#ffffff',        // Card / Container Surface
    surfaceMuted: '#f9f9f9',   // Table alternate / Secondary surface
    border: '#e0e0e0',
    borderLight: '#ebebeb',

    // Text Neutrals
    textPrimary: '#333333',
    textSecondary: '#555555',
    textMuted: '#707070',
    textSubtle: '#808080',
    textWhite: '#ffffff',
    textAlice: '#f0f8ff',

    // Semantic Accents
    accentYellow: '#ffda79',   // Warm CTA accent
    accentYellowHover: '#ffbd59',
    successGreen: '#4CAF50',   // Positive status / Export
    successGreenHover: '#45a049',
    dangerRed: '#ff4b5c',      // Logout / Destructive / Starred alert
    dangerRedHover: '#ff1f3a',
    dangerRedActive: '#d90429',
    infoBlue: '#007bff',
    infoBlueDark: '#0056b3',
    darkControl: '#4d4d4d',    // Year selector dropdown
    darkControlHover: '#3b3b3b',

    // Subsidiary Brand Badges (matching DepartmentList)
    subsidiaries: {
      MCL: '#FF6666',   // Mahanadi Coalfields Limited
      SECL: '#FFB366',  // South Eastern Coalfields Limited
      NCL: '#FF9933',   // Northern Coalfields Limited
      BCCL: '#80E6B3',  // Bharat Coking Coal Limited
      CCL: '#66CCCC',   // Central Coalfields Limited
      WCL: '#9999FF',   // Western Coalfields Limited
      ECL: '#FF66FF',   // Eastern Coalfields Limited
      CMPDI: '#66FF66', // Central Mine Planning & Design Institute
    }
  },

  radii: {
    xs: '4px',
    sm: '5px',
    md: '8px',
    card: '12px',
    pill: '20px',
    pillLarge: '30px',
    round: '50%',
  },

  shadows: {
    soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
    card: '0 4px 8px rgba(0, 0, 0, 0.1)',
    elevated: '0 6px 12px rgba(0, 0, 0, 0.15)',
    modal: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },

  transitions: {
    default: 'all 0.3s ease',
    smooth: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease',
  },

  breakpoints: {
    mobileSm: '480px',
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },

  layout: {
    topNavHeight: '96px',
    sidebarWidth: '85px',
    sidebarMobileWidth: '70px',
    contextBarHeight: '50px',
  }
};
