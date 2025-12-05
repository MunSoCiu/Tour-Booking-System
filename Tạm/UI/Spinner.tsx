import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/format";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "white" | "gray";
}

export default function Spinner({
  size = "md",
  color = "primary",
  className,
  ...props
}: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  };

  const colors = {
    primary: "border-blue-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full animate-spin",
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    />
  );
}
