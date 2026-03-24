"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

const CardViewer = dynamic(
  () => import("@/components/3d/CardViewer").then((mod) => mod.CardViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
);

class CardErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface CardViewerLazyProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
  className?: string;
}

export function CardViewerLazy(props: CardViewerLazyProps) {
  return (
    <CardErrorBoundary
      fallback={
        <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
              <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white">3D Card Preview</p>
            <p className="mt-1 text-xs text-zinc-500">Drag to rotate in full view</p>
          </div>
        </div>
      }
    >
      <CardViewer {...props} />
    </CardErrorBoundary>
  );
}
