"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("App Two client error", error, info.componentStack);
  }

  private retry = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center"
          role="alert"
        >
          <p className="text-2xl" aria-hidden>
            ⚠️
          </p>
          <h2 className="text-lg font-semibold text-white">
            Something went wrong
          </h2>
          <p className="max-w-sm text-sm text-zinc-400">
            App Two hit an unexpected client error. Retry to continue with mock
            data on this device.
          </p>
          <button
            type="button"
            onClick={this.retry}
            className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
