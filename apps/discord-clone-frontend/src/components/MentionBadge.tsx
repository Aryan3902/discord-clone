import { cn } from "@/lib/utils";

const MentionBadge = ({
  mentions,
  className,
}: {
  mentions: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-0.5 px-1.5 text-xs text-white font-extrabold bg-red-500  rounded-full flex items-center justify-center",
        className
      )}
    >
      {mentions}
    </div>
  );
};

export default MentionBadge;
