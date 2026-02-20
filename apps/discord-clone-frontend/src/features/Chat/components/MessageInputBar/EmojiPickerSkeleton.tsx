const EmojiPickerSkeleton = () => (
  <div className="w-[350px] h-[400px] bg-zinc-700 rounded-lg p-4 animate-pulse">
    <div className="flex gap-2 mb-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-8 flex-1 bg-zinc-600 rounded-md" />
      ))}
    </div>
    <div className="grid grid-cols-8 gap-2">
      {[...Array(56)].map((_, i) => (
        <div key={i} className="w-8 h-8 bg-zinc-600 rounded-full" />
      ))}
    </div>
  </div>
);

export default EmojiPickerSkeleton;
