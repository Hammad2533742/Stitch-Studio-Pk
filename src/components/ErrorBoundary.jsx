import { Component } from 'react';

/**
 * SECURITY: Global React error boundary.
 * Catches unhandled render errors and shows a safe fallback UI,
 * preventing raw stack traces from leaking to the user.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to your observability service here (e.g. Sentry) — never expose to the DOM.
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-mono-stitch text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4">
              Something went wrong
            </p>
            <h1 className="font-display text-4xl text-white mb-6">
              Atelier temporarily unavailable.
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="border border-white/30 text-white font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-white hover:text-[#0a0a0a] transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
