import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('atacado_products');
      localStorage.removeItem('atacado_current_user');
      localStorage.removeItem('atacado_custom_stores');
      localStorage.removeItem('atacado_favorites');
      localStorage.removeItem('atacado_user_role');
      localStorage.removeItem('atacado_buyer_location');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Ops! Ocorreu um problema inesperado.</h1>
          <p className="text-slate-400 max-w-md mb-6 text-sm">
            Detectamos um erro temporário na renderização. Clique no botão abaixo para restaurar o aplicativo.
          </p>
          {this.state.error && (
            <pre className="bg-slate-800 text-red-300 p-3 rounded-lg text-xs max-w-lg overflow-x-auto text-left mb-6 w-full">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="px-6 py-3 bg-[#FF5A00] hover:bg-orange-600 font-bold rounded-xl flex items-center gap-2 text-white cursor-pointer transition-all shadow-lg shadow-orange-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Recarregar Aplicativo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
