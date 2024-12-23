interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div 
      className={`animate-pulse bg-[rgba(255,255,255,0.1)] rounded-md ${className}`}
    />
  );
};