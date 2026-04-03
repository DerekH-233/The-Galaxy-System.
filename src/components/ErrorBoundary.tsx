import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-10 font-mono text-center">
          <div className="w-full max-w-md space-y-6">
            <div className="w-16 h-16 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto" />
            <h1 className="text-xl font-bold tracking-[0.5em] text-red-500 uppercase">System Failure</h1>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-[10px] text-red-400/80 break-all">
                {this.state.error?.message || 'An unexpected error occurred in the orbital systems.'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] uppercase tracking-widest transition-colors"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
