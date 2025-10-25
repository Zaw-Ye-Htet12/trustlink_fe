"use client";
import clsx from "clsx";
import * as React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export function Skeleton({
  className,
  variant = "rect",
  ...props
}: SkeletonProps) {
  const base = "bg-slate-200 dark:bg-slate-700 rounded animate-pulse";
  const shape =
    variant === "circle"
      ? "rounded-full"
      : variant === "text"
      ? "h-4 rounded-md"
      : "rounded-md";

  return <div className={clsx(base, shape, className)} {...props} />;
}

export default Skeleton;
