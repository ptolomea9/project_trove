"use client";

import dynamic from "next/dynamic";

const CardViewer = dynamic(
  () => import("@/components/3d/CardViewer").then((mod) => mod.CardViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
);

interface CardViewerLazyProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
  className?: string;
}

export function CardViewerLazy(props: CardViewerLazyProps) {
  return <CardViewer {...props} />;
}
