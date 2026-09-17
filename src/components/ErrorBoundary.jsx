import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-mono-stitch text-[11px] tracking-[0.3em] uppercase text-ink/40 mb-4">Something went wrong</p>
            <h1 className="font-display text-4xl text-ink mb-6">Atelier temporarily unavailable.</h1>
            <button onClick={() => window.location.reload()} className="border border-ink/30 text-ink font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-ink hover:text-canvas transition-colors">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}