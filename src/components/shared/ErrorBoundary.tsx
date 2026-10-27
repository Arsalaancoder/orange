import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** If true, shows admin-styled error UI */
  isAdmin?: boolean;
}

/**
 * Catches errors from lazy-loaded chunks, Suspense failures, and render errors.
 * Without this, any module-level error inside a lazy import causes a white screen.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    // Force a reload of the current page to re-fetch any failed lazy chunks
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    const { isAdmin } = this.props;

    return (
      <div
        className={`min-h-screen flex items-center justify-center p-6 ${
          isAdmin ? 'bg-[#F8FAFC]' : 'bg-[#FAFAF8]'
        }`}
      >
        <div className="max-w-md w-full text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isAdmin ? 'Admin Panel Error' : 'Something went wrong'}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {isAdmin
                ? 'The admin panel failed to load. This may be a temporary network issue.'
                : 'The page failed to load. Please try refreshing.'}
            </p>
            {this.state.error && (
              <p className="text-xs text-slate-400 font-mono bg-slate-100 rounded-lg px-3 py-2 mt-3 text-left break-all">
                {this.state.error.message}
              </p>
            )}
          </div>

          {/* Retry Button */}
          <button
            onClick={this.handleRetry}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
              isAdmin
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-[#F26A21] hover:bg-[#d85813]'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
        </div>
      </div>
    );
  }
}
