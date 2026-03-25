interface SkeletonProps {
  className?: string
  delay?: string
}

export default function Skeleton({ className = '', delay }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={delay ? { animationDelay: delay } : undefined}
      aria-hidden="true"
      role="presentation"
    />
  )
}
