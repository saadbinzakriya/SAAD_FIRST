import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('MyyCV crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 14,
            padding: '0 24px',
            textAlign: 'center',
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>
            Something went wrong
          </div>
          <h1 style={{ fontSize: 22, margin: 0, maxWidth: 480 }}>
            This page hit an unexpected error instead of loading normally.
          </h1>
          <p style={{ fontSize: 13.5, opacity: 0.65, maxWidth: 460, lineHeight: 1.6 }}>
            This usually means a required setting is missing or incorrect (like the Supabase
            connection details) rather than a bug in the page itself. Check the browser console
            (F12 → Console) for the exact error, and confirm your environment variables are set
            correctly on your hosting platform.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
