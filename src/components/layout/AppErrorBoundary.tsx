import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || "Unexpected application error.",
    };
  }

  componentDidCatch(error: Error) {
    console.error("Application render error:", error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-[radial-gradient(circle_at_10%_0%,rgba(66,133,244,0.18),transparent_40%),radial-gradient(circle_at_85%_8%,rgba(52,168,83,0.14),transparent_35%),rgb(248,249,250)] flex items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-3xl border border-md-sys-color-outline-variant/60 bg-white/95 p-8 text-center shadow-lg backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fce8e6]">
              <AlertTriangle className="h-6 w-6 text-[#d93025]" />
            </div>
            <h1 className="text-xl font-semibold text-[#202124]">Something went wrong</h1>
            <p className="mt-2 text-sm text-[#5f6368]">
              {this.state.errorMessage || "The UI encountered an unexpected issue."}
            </p>
            <div className="mt-6">
              <Button variant="filled" onClick={this.handleReload} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Reload UI
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
